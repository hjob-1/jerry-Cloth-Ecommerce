import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward ,Person} from "@material-ui/icons";

export default function FeaturedInfo({length}) {
  return (
    <div className="featuredWrapper">
      <div className="imageWrapper">
        <img src="./userpng.png" alt="" />
      </div>
       <p className="l-fontsize">{length}</p>
      <p>USERS</p>
    </div>
  );
}

export function FeaturedInfo2({length}) {
  return (
    <div className="featuredWrapper prodwidget">
      <div className="imageWrapper"><img src="./womenproduct.png" alt="" /></div>
      <p className="l-fontsize">{length}</p>
      <p> PRODUCTS</p>
    </div>
  );
}

