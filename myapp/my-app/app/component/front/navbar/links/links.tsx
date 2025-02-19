import Link from 'next/link';

export function Links() {
    const links = [
        {
            title: "HOME",
            path: "/",
        },
        {
            title: "SOLUTIONS",
            path: "/solution",
        },
        {
            title: "WHO ARE WE?",
            path: "/about",
        },
        {
            title: "BLOG",
            path: "/blog",
        },
        {
            title: "CONTACT",
            path: "/contact",
        },
    ];

    return (
        <div className="xl:flex">
            {links.map((link) => (
                
                    <Link href={link.path} key={link.title}>
                        <p className="ml-10 font uppercase text-y1 text-xl py-8 transition-all duration-100 hover:scale-110 hover:text-blk4">{link.title}</p>    
                    </Link>
                
                
            ))}
        </div>
    );
}

