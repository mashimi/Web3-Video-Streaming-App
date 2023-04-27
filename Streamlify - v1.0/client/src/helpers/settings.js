/* -----------------------------------------------------------------------------------------

    THSI FILE CONTAINS THE IMPORTANT WEB3/UI CONFIGURATIONS FOR THE APP

----------------------------------------------------------------------------------------- */
import React from 'react';
import { FaFighterJet, FaSadTear } from 'react-icons/fa';
import { RiHeart2Fill } from 'react-icons/ri';
import { BiMoviePlay } from 'react-icons/bi';
import { GiMadScientist } from 'react-icons/gi';

export const appSettings = {
    /* APP MAIN LOGO - REPLACE IT FROM THE PUBLIC FOLDER */
    logo: '/logo.svg',

    /* APP MAIN LOGO WIDTH - CHANGE IT ACCORDING TO YOUR OWN LOGO */
    logoWidth: '140',

    /* APP BRAND NAME - USED IN ALL PAGES & META TAGE - CHANGE TO YOUR OWN BRAND NAME*/
    brandName: 'Streamlify',

    /* APP BRAND DESCRIPTION - USED IN HOME PAGE & META TAGS - PUT A SENTENCE THAT DESCRIBE YOUR APP*/
    brandDescription: 'Decentralized Videos Streaming App',

    /* APP AUTHOR - CHANGE IT IF YOU HAVE A LICENSE KEY OR PURCHASE CODE */
    marketplaceAuthor: 'Web3 Monkeys',

    /* COPYRIGHTS BRAND NAME */
    copyrightsBrand: 'Web3 Monkeys',

    /* TEXT IDENTIFIER FOR THE NETWORK WHERE THE APP IS UP AND RUNNING, YOU CAN WRITE WHATEVER YOU WANT */
    activeNetworkName: 'Celo Test Network',

    /* COPYRIGHTS LINK - REPLACE IT IF YOU HAVE A LICENSE KEY OR A PURCHASE CODE */
    copyrightsLink: 'https://codecanyon.net/user/web3monkeys',

    /* THE NETWORK RPC URL WHERE YOUR CONTRACTS ARE DEPOLYED ON, CHECK THE EXACT RPC URL FROM HERE https://chainlist.org */
    rpcUrl: 'https://alfajores-forno.celo-testnet.org',

    /* THE CHAIN ID of NETWORK WHERE YOUR CONTRACTS ARE DEPOLYED ON, GET IT FROM HERE https://chainlist.org */
    networkId: 44787,

    /* THE BLOCK SCAN EXPLORER WHRE YOU CAN TRACK THE TRANSACTIONS */
    blockExplorerUrls: 'https://alfajores-blockscout.celo-testnet.org/',

    /* THE NATIVE CURRENCY THAT YOUR APP WILL USE FOR TRANSACTIONS */
    currency: 'Celo',

    /* API ROOT ENDPOINT FOR SAVING VIDEO ASSETS ON THE SERVER */
    APIURL: 'https://movix.web3monkeys.com/api/video/store',

    /* ENDPOINT FOR ASK FOR A FEATURE FORM */
    requestFeatureFormId: 'mrgvzdyy',

    /* GENERS LIST - ADD OR DELETE FROM THEM AS YOU NEED */
    genresOptions: [
        { label: 'General', value: 'General', icon: <BiMoviePlay size='3.5rem' className='text-primary' /> },
        { label: 'Action', value: 'Action', icon: <FaFighterJet size='3.5rem' className='text-primary' /> },
        { label: 'Romance', value: 'Romance', icon: <RiHeart2Fill size='3.5rem' className='text-primary' /> },
        { label: 'Sci-Fi', value: 'Sci-Fi', icon: <GiMadScientist size='3.5rem' className='text-primary' /> },
        { label: 'Drama', value: 'Drama', icon: <FaSadTear size='3.5rem' className='text-primary' /> },
    ],
};
