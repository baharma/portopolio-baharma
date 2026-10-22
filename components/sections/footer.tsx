import { site } from "@/content/site";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <p>© {site.year} {site.name}. All rights reserved.</p>
                <a href="#top">Back to top ↑</a>
            </div>
        </footer>
    );
}
