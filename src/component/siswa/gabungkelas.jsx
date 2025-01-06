import { useState } from "react";
import { gabungkelas } from "../apiservice"; // Pastikan diimpor dengan benar
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function JoinClass() {
  const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };

  const navigation = [
    { name: "Dashboard", href: "/siswa", current: false },
    { name: "Kelas", href: "/siswa/kelas", current: true },
  ];

  const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
  ];

  const [code, setCode] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const data = await gabungkelas(code); // Panggil fungsi API
      setSuccessMessage(`Successfully joined class: ${data.message}`);
      setCode("");
    } catch (error) {
      setErrorMessage(error.detail || "Failed to join class. Please try again.");
    }
  };

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="shrink-0">
                <img alt="Your Company" src="smabn.png" className="size-10" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
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

                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src={user.imageUrl}
                        className="size-8 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Gabung Kelas
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
          <h1 className="text-xl font-semibold mb-4">Join a Class</h1>

          {successMessage && (
            <div className="text-green-600 mb-4">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="text-red-600 mb-4">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700"
              >
                Class Code
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="mt-1 block w-full md:w-96 py-3 px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-500"
            >
              Join Class
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
