// file: app/layout.js
import './globals.css';
import Navbar from '../components/Navbar';
import ChatWidget from '../components/ChatWidget';
import { UserProvider } from '../context/UserContext';
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata = {
  title: 'BallotBuddy | Your Premium Election Guide',
  description: 'Step-by-step guidance for Indian elections, voter registration, and eligibility check. Based on official ECI guidelines.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
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
