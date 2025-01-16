// components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="w-64 bg-blue-600 text-white h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Job Tracker</h1>
      <ul>
        <li className="mb-2">
          <Link href="/" className="hover:underline">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/jobs/add" className="hover:underline">
           Add Job
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
