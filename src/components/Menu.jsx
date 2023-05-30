import React, {useContext} from 'react';
import {signOut} from "next-auth/react";
import {useRouter} from "next/router";
import Link from "next/link";
import {AppContext} from "@/context/AppProvider";

function Menu({user}) {
    const [active, setActive] = useContext(AppContext)
    const menuItems = [
        {
            icon: 'home_alt_fill',
            title: 'Home',
            destination: '/'
        },
        {
            icon: 'dashboard',
            title: 'Dashboard',
            destination: '/dashboard'
        },
        {
            icon: 'group',
            title: 'Employees',
            destination: '/employees'
        },
        {
            icon: 'file_blank_fill',
            title: 'Certificates',
            destination: '/certificates'
        }
    ]

    const router = useRouter();

    return (
        <div id="menu" className={"flex flex-col justify-between" + (active ? " active " : "")}>
            <div>
                <div id="menu-top">
                    <img src={"/icons/hamburger.png"} alt="hamburger" onClick={() => {
                        setActive(!active);
                        console.log(!active)
                    }} />
                </div>
                <ul id="menu-items" className="bottom-0 mt-36">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link className={item.destination === router.pathname ? "menu-item active" : "menu-item"}
                                  href={item.destination}>
                                <img src={item.destination === router.pathname ? `/icons/${item.icon}_active.png` : `/icons/${item.icon}.png`}
                                     alt={item.icon} />
                                {<p className="menu-item-title">{item.title}</p>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div id="menu-bottom">
                <div className="">
                    <div className="flex flex-row">
                        <img src="/icons/user_circle.png" alt="user" />
                        <p className="text-sm">{user?.email}</p>
                    </div>
                    <p className="text-right text-red-600" onClick={() => signOut()}>Log Out</p>
                </div>
            </div>
        </div>
    );
}

export default Menu;