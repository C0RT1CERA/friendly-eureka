import { MailIcon, PhoneIcon } from "lucide-react";


export function ContactNavbar() {
    return (
        <div className='flex flex-row justify-end gap-2 border-blk1 border-l-4 border-r-4 border-t-4 bg-y2 overflow-hidden'>
            <div className='flex items-center p-2 gap-2'>
                <PhoneIcon className="text-xl sm:text-3xl text-stone-200 " />
                <h3 className='text-xs sm:text-base text-stone-200 '>+91 7383181400</h3> {/* Adjust size for small screens */}
            </div>
            <div className='flex items-center p-2 gap-2'>
                <MailIcon className="text-xl sm:text-3xl text-stone-200 "/>
                <h3 className='text-xs sm:text-base text-stone-200 '>support@revmedsync.com</h3> {/* Adjust size for small screens */}
            </div>
        </div>
    );
}
