"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState, useEffect } from "react";
import { auth } from "@/lib/auth";

export function NavbarDemo() {
  const navItems = [
    {
      name: "Testimonials",
      link: "#examples",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Examples",
      link: "#example",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loginLabel, setLoginLabel] = useState("Login");


  useEffect(() => {
  const checkSession = async () => {
    try {
      const res = await fetch("/api/session");
      const session = await res.json();

      if (session) {
        setLoginLabel("Logout");
      } else {
        setLoginLabel("Login");
      }
    } catch (error) {
      console.error("Error fetching session:", error);
      setLoginLabel("Login");
    }
  };

  checkSession();
}, []);


  return (
    <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary" href="/auth/signin">{loginLabel}</NavbarButton>
            <NavbarButton variant="primary" href="/create">Get Started</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                {loginLabel}
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
                href="/create"
              >
                Get Started
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
    </Navbar>
  );
}


