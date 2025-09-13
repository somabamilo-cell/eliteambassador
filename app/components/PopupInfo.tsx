"use client"

import { useState } from "react"
import { LiaTimesSolid } from "react-icons/lia"
import { GrInstagram } from "react-icons/gr"
import { FaFacebook } from "react-icons/fa6"
import { BsMicrosoft } from "react-icons/bs"
import Link from "next/link"

type PopupInfoProps = {
  value: string
  outlined?: boolean
}

const socialLinks = [
  // {
  //   href: "/microsoft",
  //   label: "Microsoft",
  //   icon: <BsMicrosoft />,
  //   bg: "bg-blue-600",
  // },
  {
    href: "/facebook",
    label: "Facebook",
    icon: <FaFacebook />,
    bg: "bg-blue-600",
  },
  {
    href: "/instagram",
    label: "Instagram",
    icon: <GrInstagram />,
    bg: "bg-red-500",
  },
]

export default function PopupInfo({ value, outlined }: PopupInfoProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`py-3 px-5 mx-auto w-fit max-w-sm flex items-center justify-center rounded-lg font-semibold text-white ${
          outlined
            ? "w-fit border-2 border-white hover:bg-blue-700 hover:border-blue-700"
            : "w-full bg-blue-500"
        }`}
      >
        {value}
      </button>

      {/* Overlay + Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="min-w-[300px] rounded-xl bg-slate-200 px-10 pt-10 pb-20 shadow-lg relative">
            {/* Header */}
            <div className="mb-2 flex items-center justify-between">
              <h4 className="text-2xl font-bold">Vote with</h4>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close popup"
                className="p-1 hover:text-red-500"
              >
                <LiaTimesSolid className="text-xl" />
              </button>
            </div>

            <hr />

            {/* Social Buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-5 text-white">
              {socialLinks.map(({ href, label, icon, bg }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-md py-2 px-5 text-lg ${bg}`}
                >
                  {label} {icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
