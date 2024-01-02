// import { useNavigate } from 'react-router-dom';
import AdminContent from "../Components/meetups/AdminContent";

function Adminstrator(props)
{
    return (
      <section
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.6), black)",
          overflow: "hidden",
        }}
      >
        <AdminContent />
      </section>
    );
}

export default Adminstrator;