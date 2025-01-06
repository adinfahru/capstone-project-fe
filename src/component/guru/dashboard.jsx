import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import React, { useState } from "react";

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Kelas', href: '/guru/kelas', current: false },
];

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
];

const people = [
    {
        name: 'UAS FISIKA 2025',
        kelas: 'Fisika UAF',
        deadline: '23:59',
    },
    {
        name: 'UAS BIOLOGI 2025',
        kelas: 'Biologi kelas 8',
        deadline: '23:59',
    },
    {
        name: 'UAS Matematika Peminatan 2025',
        kelas: 'Fisika UAF',
        deadline: '23:59',
    },
    {
        name: 'UAS FISIKA 2025',
        kelas: 'Fisika UAF',
        deadline: '23:59',
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function DashboardGuru() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handlePopupToggle = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="shrink-0">
                                <img
                                    alt="Your Company"
                                    src="smabn.png"
                                    className="size-10"
                                />
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium',
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <button
                                    type="button"
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="size-6" />
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img alt="" src={user.imageUrl} className="size-8 rounded-full" />
                                        </MenuButton>
                                    </div>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        {userNavigation.map((item) => (
                                            <MenuItem key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                                >
                                                    {item.name}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>

                <DisclosurePanel className="md:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                        {navigation.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                aria-current={item.current ? 'page' : undefined}
                                className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                )}
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div>
                    <div className="border-t border-gray-700 pb-3 pt-4">
                        <div className="flex items-center px-5">
                            <div className="shrink-0">
                                <img alt="" src={user.imageUrl} className="size-10 rounded-full" />
                            </div>
                            <div className="ml-3">
                                <div className="text-base/5 font-medium text-white">{user.name}</div>
                                <div className="text-sm font-medium text-gray-400">{user.email}</div>
                            </div>
                            <button
                                type="button"
                                className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">View notifications</span>
                                <BellIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>
                        <div className="mt-3 space-y-1 px-2">
                            {userNavigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                    </div>
                </DisclosurePanel>
            </Disclosure>

            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                </div>
            </header>
            <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <ul role="list" className="divide-y divide-gray-100">
                        {people.map((person) => (
                            <li key={person.email} className="flex justify-between gap-x-6 py-5">
                                <div className="flex min-w-0 gap-x-4">
                                    <img alt="" src={person.imageUrl} className="size-12 flex-none rounded-full bg-gray-50" />
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-xl font-semibold text-gray-900">{person.name}</p>
                                        <p className="mt-1 truncate text-sm text-gray-500">{person.kelas}</p>
                                        <p className="mt-1 truncate text-sm text-gray-500">{person.deadline}</p>
                                    </div>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <Button
                                        className="rounded-full px-8 py-4 text-sm"
                                        onClick={handlePopupToggle}
                                    >
                                        Attempt Quiz
                                    </Button>
                                </div>

                                {/* Popup Box */}
                                {isPopupOpen && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
                                            <h2 className="text-xl font-semibold text-gray-900">Attempt Quiz</h2>
                                            <p className="text-gray-600 mt-4">Do you want to attempt the quiz for this subject?</p>
                                            <div className="mt-4 flex justify-end gap-4">
                                                <Button
                                                    className="px-4 py-2 bg-red-600 text-white rounded-md"
                                                    onClick={handlePopupToggle} // Close the popup
                                                >
                                                    Cancel
                                                </Button>
                                                <Link to='/siswa/quiz'>
                                                <Button
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                                >
                                                    Start Quiz
                                                </Button>
                                                </Link>
                                            </div>
                                            {/* Close Button */}
                                            <button
                                                onClick={handlePopupToggle}
                                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                                            >
                                                ✖
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}
