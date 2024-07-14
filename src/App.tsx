import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Test from './pages/Test';
import Explorer from './pages/Explorer';
import Fund from './pages/Fund';
import CreateFund from './pages/CreateFund';
import DepositorProfile from './pages/DepositorProfile';
import { WalletProvider } from '@/walletmanager';
import CryptoChart from '@/components/CryptoChart'; // Import CryptoChart component

function App() {
  return (
    <WalletProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/test" element={<Test />} />
              <Route path="/funds" element={<Explorer />} />
              <Route path="/funds/:id" element={<Fund />} />
              <Route path="/create-fund" element={<CreateFund />} />
              <Route path="/depositor/:address" element={<DepositorProfile />} />
              <Route path="/crypto-chart" element={<CryptoChart />} /> {/* Add CryptoChart route */}
              <Route path="*" element={<div>404</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </WalletProvider>
  )
}

export default App;
