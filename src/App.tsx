import React, {useState} from "react";
import { EitherExample } from "./EitherExample";
import {MultipleRequestsExamples} from "./MultipleRequestsExample";

export default function App() {
    const [eitherExampleType, setEitherExampleType] = useState('loading');
    return (
        <div>
            <div>
                <button onClick={() => setEitherExampleType('loading')}>Render loading</button>
                <button onClick={() => setEitherExampleType('error')}>Render error</button>
                <button onClick={() => setEitherExampleType('success')}>Render users</button>
            </div>
            <hr/>
            <EitherExample type={eitherExampleType} />
            <hr/>
            Multiple requests example:
            <MultipleRequestsExamples/>
        </div>
    );
}
