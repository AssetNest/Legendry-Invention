import Footer from '@/components/Footer';
import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';
import { Outlet } from 'react-router-dom';

export default function Layout() {

    return (
        <div className='w-[100vw] md:h-[100vh] md:flex md:flex-row lg:h-[100vh] lg:flex lg:flex-col overflow-x-hidden overflow-y-auto'>
            <Header
            />
            <main className='-mt-16'>
                <Outlet/>
            </main>
            <Toaster />
            <Footer />
        </div>
    )
}