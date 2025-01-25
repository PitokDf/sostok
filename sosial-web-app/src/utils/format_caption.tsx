export function formatCaption(caption: string) {
    return caption.split(" ").map((word, i) =>
        word.startsWith("#") ? (
            <span key={i} className="font-bold cursor-pointer">{word} </span>
        ) : (
            <span key={i}>{word} </span>
        )
    );
}
