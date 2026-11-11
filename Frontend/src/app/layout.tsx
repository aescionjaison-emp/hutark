import type { Metadata } from 'next';
import '../styles/globals.css';
import Header from '../components/navigation/Header';
import Footer from '../components/layout/Footer';
import FirebaseAnalytics from '../components/shared/FirebaseAnalytics';

export const metadata: Metadata = {
  title: 'HUTARK — General-Purpose Embodied Artificial Intelligence & Humanoid Robotics',
  description: 'HUTARK develops high-performance bipedal humanoids, wheeled-bipedal manipulators, quadruped robots, and foundation physical AI models.',
  keywords: ['HUTARK', 'Humanoid Robot', 'Embodied AI', 'Bipedal Robot', 'Quadruped Robot', 'Robotics', 'A3 Ultra', 'X2', 'G2'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-[#333333] selection:bg-[#0062c5] selection:text-white">
        <FirebaseAnalytics />
        <Header />
        <main className="flex-1 w-full bg-white">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

