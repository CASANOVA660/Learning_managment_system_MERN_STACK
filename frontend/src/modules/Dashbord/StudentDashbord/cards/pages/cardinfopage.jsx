import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../cardinfo";

const cardinfopage = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Current Class: Advanced Mathematics</CardTitle>
                    <CardDescription>
                        Instructor: Dr. Jane Smith | Room: 101 | Time: MWF 10:00 AM - 11:30 AM
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        This advanced course covers topics in calculus, linear algebra, and differential equations.
                        Students will engage in rigorous problem-solving and theoretical discussions.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default cardinfopage;
