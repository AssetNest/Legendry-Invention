import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

interface NavLinkButtonProps {
  to: string;
  children: React.ReactNode;
}

const NavButton: React.FC<NavLinkButtonProps> = ({ to, children }) => {

  const navigator = useNavigate();

  const handleClick = () => {
    navigator(to);
  };
  
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);

  return (
    <Button variant="ghost" className={`h-[100%] w-24 relative glow-bottom-border hover:bg-transparent group ${isActive ? "text-primary font-bold glow-bottom-border-fixed" : "" }`} onClick={handleClick}><div className="group-hover:text-400 group-hover:text-shadow-primary-glow">{children}</div></Button>
  );
};

export default NavButton;