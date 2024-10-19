const Header = ({ token }: { token: string }) => {
    return {
        "Content-Type": "application/json",
        "Token": token,
    };
}

export default Header;