export default function Footer() {
  return (
    <footer
      className="bg-gray-100 text-center text-gray-700 py-4 mt-auto shadow-inner bottom-0
    w-full"
    >
      <p>&copy; {new Date().getFullYear()} PrepWithMe. All rights reserved.</p>
    </footer>
  );
}
