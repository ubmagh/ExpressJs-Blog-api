import React from 'react';
import { Helmet } from "react-helmet";

export default function Home(props:any){
    return (
        <>
            <Helmet> 
                <title>Blog- Home page</title>
            </Helmet>
            <h1> Home </h1>
        </>
    )
}