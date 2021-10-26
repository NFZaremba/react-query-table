type HeaderProps = {
  children: React.ReactChild;
};

const Header = ({ children }: HeaderProps) => {
  return <h1 className="bold text-4xl text-white my-8">{children}</h1>;
};

export default Header;
