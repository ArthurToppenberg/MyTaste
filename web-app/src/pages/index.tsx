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

const Index: React.FC = () => {
  //check if session exists?
  const { data: session, status } = useSession();

  const notAuthedElements: JSX.Element[] = [
    <Button onClick={() => console.log('Button 2 clicked')}>Register</Button>,
    <Button onClick={() => window.location.href = '/auth/signin'}>Sign In</Button>
  ];

  const [nameElement, setNameElement] = useState<JSX.Element>(<InfoBox text={"LOADING"} loading={true} />);
  const [emailElement, setEmailElement] = useState<JSX.Element>(<InfoBox text={"LOADING"} loading={true} />);
  
  const authedElements: JSX.Element[] = [
    nameElement,
    emailElement,
    <Button onClick={() => signOut({ callbackUrl: '' })}>Sign Out</Button>
  ];

  //session.user.permission === 1
  const authedElementsAdmin: JSX.Element[] = [
    <Button onClick={() => window.location.href = '/protected/profile'}>Admin</Button>
  ];

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if(!session){
      return;
    }

    getProfile().then((profile: IProfile) => {
      setNameElement(<InfoBox text={`Name: ${profile.name}`} />);
      setEmailElement(<InfoBox text={`Email: ${profile.email}`} />);
    });

  }, [session, status]);
  

  return (
    <>
      <Head>
        <title>My Taste</title>
      </Head>
      <Toolbar
        tabs={[
          { name: 'Home', tab: <Home /> },
          { name: 'About', tab: <About /> },
          { name: 'Contact', tab: <Contact /> }
        ]}
        elements={
          //if session exists, return authedElements, else return notAuthedElements
          session ? authedElements : notAuthedElements
        }
      />
    </>
  );
};

export default Index;
