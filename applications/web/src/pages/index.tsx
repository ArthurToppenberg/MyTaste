import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace('/landing');
    }, [router]);

    return null;
};

export default HomePage;