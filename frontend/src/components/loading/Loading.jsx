import "./Loading.css";

export default function Loading({child=false}) {
  return (
    <div className={`loading-container ${child? "loading-child": ""}`}>
      <img src="loading.svg" />
    </div>
  )
}
