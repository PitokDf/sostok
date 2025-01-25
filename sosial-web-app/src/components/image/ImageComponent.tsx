import style from "./ImageComponent.module.css"

export default function ImageComponent({ src, alt }: { src: string, alt: string }) {
    return (
        <div className={"object-contain"}>
            <img src={src} alt={alt} />
        </div>
    );
}