import React from 'react';
import Layout from "@/components/Layout";

function Loading() {
    return (
        <Layout>
            <div className="flex justify-center items-center h-screen c-full">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>

        </Layout>
    );
}

export default Loading;