'use client'

import { storyData } from "@/lib/data";
import { Story } from "@/lib/types";
import { FormEvent, useState } from "react";

export default function create() {
    const [form, setForm] = useState<Story>({
        expiresAt: new Date().toISOString(),
        imageUrls: [],
        type: "",
        userID: 1
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        storyData.push(form)
        console.log(storyData);

        setForm({ ...form, imageUrls: [] })
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
                value={form?.imageUrls}
                className="bg-gray-500"
                onChange={e => setForm({ ...form, imageUrls: [e.target.value] })}
            />

            <button type="submit">Submit</button>
        </form>
    );
}