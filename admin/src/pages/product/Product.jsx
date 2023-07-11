import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCallsProduct";
import { useDispatch } from "react-redux";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const [title, setTitle] = useState(product.title);
  const [desc, setDesc] = useState(product.desc || "");
  const [priceKg, setPriceKg] = useState(product.priceKg || "");
  const [priceUnit, setPriceUnit] = useState(product.priceUnit || "");
  const [priceCase, setPriceCase] = useState(product.priceCase || "");
  const [unitsInKg, setUnitsInKg] = useState(product.unitsInKg || "");
  const [kgInUnit, setKgInUnit] = useState(product.kgInUnit || "");
  const [inStock, setInStock] = useState(product.inStock || "");

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedProduct = {
      productId,
      title,
      desc,
      priceKg,
      priceUnit,
      priceCase,
      unitsInKg,
      kgInUnit,
      inStock,
    };

    updateProduct(productId, updatedProduct, dispatch);
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleSubmit}>
          <div className="productFormLeft">
            <label>שם המוצר</label>
            <input
              type="text"
              placeholder={product.title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>תיאור המוצר</label>
            <input
              type="text"
              placeholder={product.desc}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <label>מחיר לק״ג</label>
            <input
              type="text"
              placeholder={product.priceKg}
              value={priceKg}
              onChange={(e) => setPriceKg(e.target.value)}
            />
            <label>מחיר ליחידה</label>
            <input
              type="text"
              placeholder={product.priceUnit}
              value={priceUnit}
              onChange={(e) => setPriceUnit(e.target.value)}
            />
            <label>כמות יח׳ בק״ג</label>
            <input
              type="text"
              placeholder={product.unitsInKg}
              value={unitsInKg}
              onChange={(e) => setUnitsInKg(e.target.value)}
            />
            <label>מחיר למארז - אם המוצר נמכר כמארז</label>
            <input
              type="text"
              placeholder={product.priceCase}
              value={priceUnit}
              onChange={(e) => setPriceCase(e.target.value)}
            />
            <label>כמות יחידות במארז אם המוצג נמכר כמארז</label>
            <input
              type="text"
              placeholder={product.kgInUnit}
              value={kgInUnit}
              onChange={(e) => setKgInUnit(e.target.value)}
            />
            <label>במלאי?</label>
            <select
              name="inStock"
              id="idStock"
              value={product.inStock}
              onChange={(e) => setInStock(e.target.value)}
            >
              <option value="true">כן</option>
              <option value="false">לא</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
