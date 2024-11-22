import Link from 'next/link';

export default function Home() {
    const options = [
        { name: 'Views', path: '/view' },
        { name: 'Procedures', path: '/procedures' }
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-2xl font-bold mb-4">Database Options</h1>
            <ul className="list-disc">
                {options.map((option) => (
                    <li key={option.name} className="mb-2">
                        <Link href={option.path} className="text-blue-500 hover:underline">
                            {option.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}