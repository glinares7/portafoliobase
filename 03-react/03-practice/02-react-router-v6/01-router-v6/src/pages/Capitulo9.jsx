import React from "react";
import { Link, useLocation } from "react-router-dom";

const Capitulo9 = () => {
  // const { search } = useLocation();

  // let ak = React.useMemo(() => new URLSearchParams(search), [search]);
  // console.log(
  //   ak.get("name") +
  //     " ademas " +
  //     ak.get("color") +
  //     " agregamos " +
  //     ak.get("forma")
  // );

  const useQuery = () => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  };

  let query = useQuery();
  const TextoParametro = ({ name, color, forma }) => {
    // let { id } = useParams();

    console.log(name);

    return (
      <div>
        {name ? (
          <h3>
            The <code>name</code> in the query string is &quot; {name} -{color}-{" "}
            {forma}
            &quot;
          </h3>
        ) : (
          <h3>There is no name in the query string</h3>
        )}
      </div>
    );
  };
  return (
    <div style={{ padding: "0px 15px" }}>
      <h1>Query Parameters Demo(Multivalores)</h1>
      <h2>Accounts</h2>
      <ul>
        <li>
          <Link to={`account?name=netflix&color=pink&forma=zent`}>Neflix</Link>
        </li>
        <li>
          <Link to={`account?name=zillow-group&color=orange&forma=circular`}>
            Zillow-Group
          </Link>
        </li>
        <li>
          <Link to={`account?name=yahoo&color=gray&forma=hiperbola`}>
            Yahoo
          </Link>
        </li>
        <li>
          <Link to={`account?name=modus-create&color=blanco&forma=loto`}>
            Zmodus-Create
          </Link>
        </li>
      </ul>

      <hr />

      <TextoParametro
        name={query.get("name")}
        color={query.get("color")}
        forma={query.get("forma")}
      />
    </div>
  );
};

export default Capitulo9;
