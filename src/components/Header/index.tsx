import logo from "../../assets/logo.png";

const Header: React.FC = () => {
	return (
		<div className="bg-white shadow-xl p-4 pl-8 mb-8">
			<img src={logo} alt="logo" className="w-[60px]" />
		</div>
	);
};

export default Header;
