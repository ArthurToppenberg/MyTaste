import { useEffect, useState } from "react";
import Toolbar from "@/components/toolbar";
import InfoBox from "@/components/info_box";
import Home from "@/tabs/index/home";
import UnderDevelopment from "@/tabs/underDevelopment";
import Accounts from "@/tabs/admin/accounts";
import SignIn from "@/tabs/auth/signin";
import Register from "@/tabs/auth/register";
import Dropdown from "@/components/toolbar_dropdown";
import Head from "next/head";
import { getProfile } from "@/utils/client/profile";
import { getUser } from "@/utils/client/user";
import { useAuthContext } from "@packages/authProvider";
import { IProfile } from "./api/protected/profile";
import { IUser } from "./api/protected/user";

const Index: React.FC = () => {
  const { authedRequest, isAuthed, localDeleteToken } = useAuthContext(); // Assuming isAuthenticated is available in context

  const [tab, setTab] = useState<JSX.Element>(<Home />);

  const [nameElement, setNameElement] = useState<JSX.Element>(<InfoBox text={"LOADING"} loading={true} />);
  const [phoneElement, setPhoneElement] = useState<JSX.Element>(<InfoBox text={"LOADING"} loading={true} />);

  const [manageDropdown, setManageDropdown] = useState<JSX.Element>(<InfoBox loading={true} />);
  const [developerDropdown, setDeveloperDropdown] = useState<JSX.Element>(<InfoBox loading={true} />);

  const notAuthedElements: JSX.Element[] = [
    <InfoBox key="Sign in button" text="Sign in" invertOnHover={true} invertOnClick={true} onClick={() => setTab(<SignIn setTab={setTab} previousTab={tab}/>)} />,
    <InfoBox key="Sign up button" text="Sign up" invertOnHover={true} invertOnClick={true} onClick={() => setTab(<Register setTab={setTab} previousTab={tab}/>)} />
  ];

  const authedElements: JSX.Element[] = [
    nameElement,
    phoneElement,
    developerDropdown,
    manageDropdown,
    <Dropdown key="Account Dropdown" buttonText="Account" itemsProps={[
      { name: "Profile", onClick: () => setTab(<UnderDevelopment />) },
      { name: "Logout", onClick: () => {localDeleteToken(); setTab(<Home />)} }
    ]} />
  ];

  const [profile, setProfile] = useState<IProfile | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (isAuthed()) {
      const fetchData = async () => {
        try {
          if (!profile) {
            const fetchedProfile = await getProfile(authedRequest);
            setProfile(fetchedProfile);
            setNameElement(fetchedProfile.name ? <InfoBox text={`Name: ${fetchedProfile.name}`} /> : <></>);
            setPhoneElement(fetchedProfile.phoneNumber ? <InfoBox text={`Phone: ${fetchedProfile.phoneNumber}`} /> : <></>);
          }

          if (!user) {
            const fetchedUser = await getUser(authedRequest);
            setUser(fetchedUser);
            switch (fetchedUser.permission) {
              case "ADMIN":
                setDeveloperDropdown(<></>);
                setManageDropdown(
                  <Dropdown buttonText="Admin" itemsProps={[
                    { name: "Accounts", onClick: () => setTab(<Accounts />) },
                    { name: "MyTaste Questions", onClick: () => setTab(<UnderDevelopment />) }
                  ]} />
                );
                break;
              case "DEVELOPER":
                setDeveloperDropdown(
                  <Dropdown buttonText="Developer" itemsProps={[
                    { name: "Prompts", onClick: () => setTab(<UnderDevelopment />) },
                    { name: "API", onClick: () => setTab(<UnderDevelopment />) },
                    { name: "Documentation", onClick: () => setTab(<UnderDevelopment />) }
                  ]} />
                );
                setManageDropdown(
                  <Dropdown buttonText="Admin" itemsProps={[
                    { name: "Accounts", onClick: () => setTab(<Accounts />) },
                    { name: "MyTaste Questions", onClick: () => setTab(<UnderDevelopment />) }
                  ]} />
                );
                break;
              default:
                setDeveloperDropdown(<></>);
                setManageDropdown(<></>);
                break;
            }
          }
        } catch (error) {
          console.error("Failed to fetch profile and user data: ", error);
        }
      };

      fetchData(); // Call the function
    } else {
      // Reset elements to loading state
      setNameElement(<InfoBox loading={true} />);
      setPhoneElement(<InfoBox loading={true} />);
      setDeveloperDropdown(<InfoBox loading={true} />);
      setManageDropdown(<InfoBox loading={true} />);

      // Reset profile and user state
      setProfile(null);
      setUser(null);
    }
  }, [tab, isAuthed, authedRequest, profile, user]); // Runs when authentication status changes

  return (
    <>
      <Head>
        <title>My Taste</title>
      </Head>
      <Toolbar
        hideTabLinkButtons={false}
        showTabLinkButtonsOnHover={true}
        setTab={setTab}
        logo={<InfoBox imagePath="/images/logo.png" noBorder={true} />}
        tabLinks={[
          { name: 'Home', tab: <Home /> },
          { name: 'About', tab: <UnderDevelopment /> },
          { name: 'Contact', tab: <UnderDevelopment /> }
        ]}
        elements={
          isAuthed() ? authedElements : notAuthedElements // Conditionally render elements based on authentication
        }
      />
      {tab}
    </>
  );
};

export default Index;
