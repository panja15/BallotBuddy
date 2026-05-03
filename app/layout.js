// file: app/layout.js
import './globals.css';
import Navbar from '../components/Navbar';
import ChatWidget from '../components/ChatWidget';
import { UserProvider } from '../context/UserContext';

export const metadata = {
  title: 'BallotBuddy | Your Election Guide',
  description: 'Step-by-step guidance for Indian elections, voter registration, and eligibility check.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <ChatWidget />
        </UserProvider>
      </body>
    </html>
  );
}
