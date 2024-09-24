import Toolbar from "@/components/toolbar";
import Button from "@/components/button";
import InfoBox from "@/components/info_box";

import Home from "@/tabs/index/home";
import About from "@/tabs/index/about";
import Contact from "@/tabs/index/contact";

import Head from "next/head";

import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from "react";

import { getProfile } from "@/utils/profile";
import { IProfile } from "./api/protected/profile";

import { getUser } from "@/utils/user";
import { IUser } from "./api/protected/user";

import Dropdown from "@/components/drop_down";

import Profile from "@/tabs/account/profile";

const Index: React.FC = () => {
  //check if session exists?
  const { data: session, status } = useSession();

  const notAuthedElements: JSX.Element[] = [
    <Button onClick={() => window.location.href = '/auth/register'}>Register</Button>,
    <Button onClick={() => window.location.href = '/auth/signin'}>Sign In</Button>
  ];

  const [nameElement, setNameElement] = useState<JSX.Element>(<InfoBox text={"LOADING"} loading={true} />);
  const [emailElement, setEmailElement] = useState<JSX.Element>(<InfoBox text={"LOADING"} loading={true} />);

  const [manageDropdown, setManageDropdown] = useState<JSX.Element>(<InfoBox loading={true} />);
  const [developerDropdown, setDeveloperDropdown] = useState<JSX.Element>(<InfoBox loading={true} />);

  const authedElements: JSX.Element[] = [
    nameElement,
    emailElement,
    developerDropdown,
    manageDropdown,
    <Dropdown buttonText="Account" itemsProps={[
      { name: "Profile", action: () => setTab(<Profile />) },
      { name: "Logout", action: () => signOut({ callbackUrl: '' }) }
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
      setNameElement(<InfoBox text={`Name: ${profile.name}`} />);
      setEmailElement(<InfoBox text={`Phone: ${profile.phoneNumber}`} />);
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
        setManageDropdown(<Dropdown buttonText="Manage" itemsProps={[
          { name: "Accounts", action: () => alert("Accounts") },
          { name: "Restorants", action: () => alert("Restorants") },
        ]} />);
      }

      function developerDropdown(show: boolean) {
        setDeveloperDropdown(<Dropdown buttonText="Developer" itemsProps={[
          { name: "API", action: () => alert("API") },
          { name: "Documentation", action: () => alert("Documentation") },
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
          { name: 'About', tab: <About /> },
          { name: 'Contact', tab: <Contact /> }
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
