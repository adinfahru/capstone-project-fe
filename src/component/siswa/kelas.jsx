import React, { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { getKelasSiswa } from '../apiservice'; // Mengimpor fungsi yang benar
import axios from 'axios';

export default function KelasGuru() {
    const user = {
        name: 'Tom Cook',
        email: 'tom@example.com',
        imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    };

    const navigation = [
        { name: 'Dashboard', href: '/siswa', current: false },
        { name: 'Kelas', href: '/siswa/kelas', current: true },
    ];

    const userNavigation = [
        { name: 'Your Profile', href: '#' },
        { name: 'Settings', href: '#' },
        { name: 'Sign out', href: '/login' },
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    // Menggunakan nama state yang lebih deskriptif
    const [kelasData, setKelasData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchKelasData = async () => {
            try {
                const data = await getKelasSiswa(); // Panggil fungsi getKelas untuk mengambil data
                setKelasData(data); // Simpan data kelas ke dalam state
            } catch (error) {
                setErrorMessage(error.message || "Failed to fetch kelas data");
            }
        };

        fetchKelasData(); // Panggil fungsi untuk mengambil data saat komponen dimuat
    }, []);

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="shrink-0">
                                <img
                                    alt="Your Company"
                                    src="/public/smabn.png"
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
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="size-6" />
                                </button>

                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Open user menu</span>
                                            <img alt="" src={user.imageUrl} className="size-8 rounded-full" />
                                        </MenuButton>
                                    </div>
                                    <MenuItems
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5"
                                    >
                                        {userNavigation.map((item) => (
                                            <MenuItem key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
            </Disclosure>

            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Kelas</h1>
                    <div className="hidden sm:flex sm:items-end">
                        <Link to="/siswa/gabungkelas">
                            <Button className="rounded-full px-8 py-4 text-sm">Gabung Kelas</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-36 place-items-center">
                {errorMessage && <div className="text-red-600">{errorMessage}</div>}
                {kelasData.map((kelas) => (
                    <div key={kelas.id} className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg w-96">
                        <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                            <img
                                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                                alt="class-image"
                            />
                        </div>
                        <div className="p-4">
                            <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                                {kelas.name}
                            </h6>
                            <p className="text-slate-600 leading-normal font-light">
                                Jumlah Siswa: {kelas.students.length}
                            </p>
                        </div>
                        <div className="px-4 pb-4 pt-0 mt-2">
                            <button
                                className="rounded-md bg-slate-800 py-2 px-4 text-sm text-white hover:bg-slate-700"
                                type="button"
                            >
                                More info
                            </button>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}
