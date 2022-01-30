/**
 * 
 * @param props
 * @param props.header komponent Header
 * @param props.menu komponent Menu
 * @param props.content komponent Content
 * @param props.footer komponent Footer
 * @returns Ułożenie komponentów aplikacji
 */
function Layout(props) {
    return (
        <div>
            <div>{props.header}</div>
            <div>{props.menu}</div>
            <div>{props.content}</div>
            <div>{props.footer}</div>
        </div>
    );
}

export default Layout;