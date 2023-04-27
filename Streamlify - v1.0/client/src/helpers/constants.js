/* -----------------------------------------------------------------------------------------

    THSI FILE CONTAINS SOME STATIC DATA TO FILL SOME DIFFERENT COMPONENTS

----------------------------------------------------------------------------------------- */

import React from 'react';

/* FAQS LIST - ADD OR DELETE FROM THEM AS YOU NEED */
export const FAQS = [
    {
        question: 'Who are we?',
        answer: (
            <div className='text-muted'>
                <p className='mb-2'>
                    A successful Web3 software development team works like a well-oiled machine, with each team member
                    making important contributions to the final project.
                </p>
            </div>
        ),
    },
    {
        question: 'What stack is the App built with?',
        answer: (
            <div className='text-muted'>
                <p className='mb-2'>
                    <strong className='text-white'>Solidity</strong> – building smart contracts
                </p>
                <p className='mb-2'>
                    <strong className='text-white'>Truffle suite</strong> – development environment, testing framework,
                    and asset pipeline for blockchains.
                </p>
                <p className='mb-2'>
                    <strong className='text-white'>Web3.js</strong> – JavaScript Library that allows interacting with a
                    local or remote Ethereum node
                </p>
                <p className='mb-2'>
                    <strong className='text-white'>Laravel</strong> – Server to save images with metadata in the
                    blockchain
                </p>
                <p className='mb-2'>
                    <strong className='text-white'>MetaMask</strong> – Crypto wallet for trading NFTs
                </p>
                <p className='mb-2'>
                    <strong className='text-white'>React.js</strong> – JavaScript framework to build the user interface
                    and connect everything together
                </p>
                <p className='mb-2'>
                    <strong className='text-white'>Bootstrap 5</strong> – UI
                </p>
            </div>
        ),
    },
    {
        question: 'What blockchains are supported?',
        answer: (
            <div className='text-muted'>
                <p className='mb-2'>Our products support these blockchains:</p>
                <ul className='mb-0 text-white'>
                    <li>Ethereum</li>
                    <li>Binance Smart Chain</li>
                    <li>Polygon</li>
                    <li>Celo</li>
                </ul>
            </div>
        ),
    },
    {
        question: 'What wallets are supported?',
        answer: (
            <div className='text-muted'>
                <p className='mb-2'>At the moment, you can use MetaMask wallet.</p>
            </div>
        ),
    },
    {
        question: 'What are the system requirements?',
        answer: (
            <div className='text-muted'>
                <p className='mb-2'>The system requirements are:</p>
                <p className='mb-2'>
                    <strong className='text-white'>Production</strong> – any hosting provider that supports React.js
                    apps, we’re highly recommending Digital Ocean, but any similar would work.
                </p>
                <p className='mb-2'>
                    <strong className='text-white'>Development</strong> – Node.js v16 or higher, and a blockchain local
                    server (Ganache) for local development.
                </p>
            </div>
        ),
    },
    {
        question: 'Is there any Admin Panel included?',
        answer: (
            <div className='text-muted'>
                <p className='mb-2'>
                    Yes, the admin panel is already integrated into the UI but only accessible by the marketplace owner.
                    It's not a CMS, the admin dashboard allows admin to manage the videos and track his profits
                </p>
                <p className='mb-2 fw-bold'>The admin dashboard contains:</p>
                <ul className='mb-0 text-white'>
                    <li>The app profits</li>
                    <li>All Videos with their status, pending or active.</li>
                    <li>Ability to approve videos</li>
                    <li>Ability to block videos</li>
                </ul>
            </div>
        ),
    },
    {
        question: 'Do you provide support for your products?',
        answer: (
            <div className='text-muted'>
                <p className='mb-2'>Yes, all our products come with free support during your active subscription.</p>
            </div>
        ),
    },
    {
        question: "Are you'll be available for further customiztions?",
        answer: (
            <div className='text-muted'>
                <p className='mb-2'>
                    Sure do we. We have a very talented team that will be open to any customization depending on the
                    capacity of the work needed.
                </p>
            </div>
        ),
    },
    {
        question: 'More questions?',
        answer: (
            <div className='text-muted'>
                <p className='mb-2'>
                    If you can’t find the answers here,{' '}
                    <a
                        href='https://web3monkeys.com/contact-us/'
                        className='text-primary'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        get in touch
                    </a>
                    . We will be happy to help.
                </p>
            </div>
        ),
    },
];
