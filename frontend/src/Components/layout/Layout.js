import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

function Layout(props) {
  return (
    <div style={{ minHeight : '100vh' , backgroundColor: "#dfe4ea" }}>
      <MainNavigation Ticketsnum={props.TicketsNum} />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
