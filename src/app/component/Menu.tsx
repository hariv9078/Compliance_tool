import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/dashboard.png",
        label: "Dashboard",
        href: "/user",
      },
      {
        icon: "/calendar.png",
        label: "calender View",
        href: "/calender",
      },
      {
        icon: "/file.png",
        label: "Take Action",
        href: "/complianceUpload",
      },
      {
        icon: "/leader.png",
        label: "Master",
        href: "#",
      },
      {
        icon: "/report.png",
        label: "Report",
        href: "/Report",
      },
      {
        icon: "/book.png",
        label: "Library",
        href: "#",
      },
      {
        icon: "/update.png",
        label: "Compliance Update",
        href: "#",
      },
      {
        icon: "/help.png",
        label: "Help",
        href: "#",
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-md ">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="flex items-start justify-start lg:justify-start px-2 gap-4 text-stone-500 py-2"
            >
              <Image src={item.icon} alt="" width={20} height={20} />
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};
export default Menu;
