import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import UserProfile from '../../../components/UserProfile';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Bible', href: '/bible' },
  { name: 'Characters', href: '/characters' },
  { name: 'Search', href: '/search' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navigation() {
  const router = useRouter();

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-orange-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Biblical Chatbot
              </Link>
            </div>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navigation.map((item) => (
                <Fragment key={item.name}>
                  <Link 
                    href={item.href}
                    className={classNames(
                      router.pathname === item.href
                        ? 'border-orange-500 text-orange-700'
                        : 'border-transparent text-gray-600 hover:border-orange-300 hover:text-orange-700',
                      'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-200'
                    )}
                  >
                    {item.name}
                  </Link>
                </Fragment>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <UserProfile />
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                  <>
                    <Menu.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200">
                      <span className="sr-only">Open menu</span>
                      {open ? (
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                      )}
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {navigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <div className={active ? 'bg-orange-50' : ''}>
                                  <Link 
                                    href={item.href}
                                    className={classNames(
                                      router.pathname === item.href
                                        ? 'bg-orange-100 text-orange-700'
                                        : 'text-gray-700',
                                      'block px-4 py-2 text-sm transition-colors duration-200'
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                </div>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
