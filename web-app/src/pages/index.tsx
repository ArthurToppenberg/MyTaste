import Toolbar from "@/components/toolbar";
import InfoBox from "@/components/info_box";

import Home from "@/tabs/index/home";
// import About from "@/tabs/index/about";
// import Contact from "@/tabs/index/contact";

import Head from "next/head";

import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from "react";

import { getProfile } from "@/utils/client/profile";
import { IProfile } from "./api/protected/profile";

import { getUser } from "@/utils/client/user";
import { IUser } from "./api/protected/user";

import Dropdown from "@/components/toolbar_dropdown";

import UnderDevelopment from "@/tabs/underDevelopment";
import Accounts from "@/tabs/admin/accounts"

const Index: React.FC = () => {
  //check if session exists?
  const { data: session, status } = useSession();

  const notAuthedElements: JSX.Element[] = [
    <InfoBox key="Sign in button" text="Sign in" invertOnHover={true} invertOnClick={true} onClick={() => window.location.href = '/auth/signin'} />,
    <InfoBox key="Sign up button" text="Sign up" invertOnHover={true} invertOnClick={true} onClick={() => window.location.href = '/auth/register'} />
  ];

  const [nameElement, setNameElement] = useState<JSX.Element>(<InfoBox text={"LOADING"} loading={true} />);
  const [phoneElement, setEmailElement] = useState<JSX.Element>(<InfoBox text={"LOADING"} loading={true} />);

  const [manageDropdown, setManageDropdown] = useState<JSX.Element>(<InfoBox loading={true} />);
  const [developerDropdown, setDeveloperDropdown] = useState<JSX.Element>(<InfoBox loading={true} />);

  const authedElements: JSX.Element[] = [
    nameElement,
    phoneElement,
    developerDropdown,
    manageDropdown,
    <Dropdown key="Account Dropdown" buttonText="Account" itemsProps={[
      { name: "Profile", onClick: () => setTab(<UnderDevelopment />) },
      { name: "Logout", onClick: () => signOut({ callbackUrl: '' }) }
    ]} />
  ];

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session) {
      return;
    }

    getProfile().then((profile: IProfile) => {
      setNameElement(profile.name ? <InfoBox text={`Name: ${profile.name}`} /> : <></>);
      setEmailElement(profile.phoneNumber ? <InfoBox text={`Phone: ${profile.phoneNumber}`} /> : <></>);
    });

    getUser().then((user: IUser) => {

      switch (user.permission) {
        case "ADMIN":
          developerDropdown(false);
          mangageDropdown(true);
          break;
        case "DEVELOPER":
          developerDropdown(true);
          mangageDropdown(true);
          break;
        default:
          developerDropdown(false);
          mangageDropdown(false);
          break;
      }

      function mangageDropdown(show: boolean) {
        if(!show) {
          return setManageDropdown(<></>);
        }
        setManageDropdown(<Dropdown buttonText="Admin" itemsProps={[
          { name: "Accounts", onClick: () => setTab(<Accounts />) },
          { name: "Restorants", onClick: () => setTab(<UnderDevelopment />) },
        ]} />);
      }

      function developerDropdown(show: boolean) {
        if(!show) {
          return setDeveloperDropdown(<></>);
        }
        setDeveloperDropdown(<Dropdown buttonText="Developer" itemsProps={[
          { name: "Prompts", onClick: () => setTab(<UnderDevelopment />) },
          { name: "API", onClick: () => setTab(<UnderDevelopment />) },
          { name: "Documentation", onClick: () => setTab(<UnderDevelopment />) },
        ]} />);
      }
    });

  }, [session, status]);

  const [tab, setTab] = useState<JSX.Element>(<Home />);

  return (
    <>
      <Head>
        <title>My Taste</title>
      </Head>
      <Toolbar
        setTab={setTab}
        logo={<InfoBox text="My Taste" />}
        tabLinks={[
          { name: 'Home', tab: <Home /> },
          { name: 'About', tab: <UnderDevelopment /> },
          { name: 'Contact', tab: <UnderDevelopment /> }
        ]}
        elements={
          session ? authedElements : notAuthedElements
        }
      />
      {tab}
    </>
  );
};

export default Index;
