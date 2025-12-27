import { drawContributions } from "github-contributions-canvas";

// Configuration
interface Repository {
    owner: string;
    name: string;
}

const CONFIG = {
    github: {
        username: "laewliet",
        url: "https://github.com/laewliet"
    },
    linkedin: {
        username: "kylolinden",
        url: "https://www.linkedin.com/in/kylolinden/"
    },
    repositories: [
        { owner: "archlinux", name: "archinstall" },
        { owner: "ValveSoftware", name: "Proton" },
        { owner: "laewliet", name: "make-your-choice" },
        { owner: "laewliet", name: "red-ios" },
        { owner: "laewliet", name: "near-bot" },
    ] as Repository[]
};

// Project Data
interface ProjectLink {
    label: string;
    url: string;
}

interface ProjectImage {
    src: string;
    description: string;
}

interface Project {
    id: string;
    title: string;
    tagline: string;
    about: string;
    features: string[];
    images: ProjectImage[];
    links: ProjectLink[];
}

const PROJECTS: Project[] = [
    {
        id: "near",
        title: "Near",
        tagline: "A discord.js app w/ database integration",
        about: "Discord bot built with TypeScript & JavaScript featuring slash commands, event handling, and PostgreSQL database integration for managing user data and server configurations.",
        features: [
            "Server-wide deployment or personal app functionality",
            "DM and group chat support",
            "Modern Discord bot architecture",
            "Integrates with various APIs such as Spotify, Apple Music, Minecraft."
        ],
        images: [
            { src: "../assets/img/projects/near/preview.jpg", description: "Near Discord bot preview" },
            { src: "../assets/img/projects/near/invite-popup.png", description: "Discord app invite options showing server-wide and personal app availability." },
            { src: "../assets/img/projects/near/screenshot1.png", description: "Easily share songs with friends no matter what streaming service they use" },
            { src: "../assets/img/projects/near/screenshot2.png", description: "Preview song snippets using Spotify's API." },
            { src: "../assets/img/projects/near/screenshot3.png", description: "Get live game information such as the Dead by Daylight shrine content." }
        ],
        links: [
            {
                label: "Add to Discord",
                url: "https://discord.com/oauth2/authorize?client_id=800998960851845150"
            }
        ]
    },
    {
        id: "makeyourchoice",
        title: "Make Your Choice",
        tagline: "The best server switcher for DbD",
        about: "Server region changer for Dead by Daylight that modifies Windows/Linux hosts files to redirect game server connections, giving players control over server selection.",
        features: [
            "Built with Rust for Linux, C# and .NET framework for Windows",
            "Windows 7-11 compatibility",
            "Compatible with any modern Linux distribution",
            "Fully open source"
        ],
        images: [
            { src: "../assets/img/projects/makeyourchoice/preview.png", description: "MakeYourChoice banner image" },
            { src: "../assets/img/projects/makeyourchoice/main.png", description: "Main interface showing server region selection" },
            { src: "../assets/img/projects/makeyourchoice/screenshot2.png", description: "Successful host file patch." }
        ],
        links: [
            {
                label: "Repository",
                url: "https://github.com/laewliet/make-your-choice"
            },
            {
                label: "Download",
                url: "https://github.com/laewliet/make-your-choice/releases"
            }
        ]
    },
    {
        id: "panva",
        title: "Panva iOS & Mac",
        tagline: "A wishlist for locations",
        about: "Native iOS/macOS app for discovering travel destinations using SwiftUI, Yelp API integration, and MapKit for interactive venue visualization. Selected as #1 most innovative project in high school final project competition.",
        features: [
            "Dynamic theming and dark mode",
            "AirDrop functionality",
            "Customizable UI",
            "No longer maintained; not publicly available"
        ],
        images: [
            { src: "../assets/img/projects/panva/preview.jpg", description: "Panva iOS app preview" },
            { src: "../assets/img/projects/panva/explore-dark.jpg", description: "Location search and explore interface in dark mode." },
            { src: "../assets/img/projects/panva/explore-light.jpg", description: "Location search and explore interface in light mode." },
            { src: "../assets/img/projects/panva/map-wishlist.jpg", description: "Interactive map showing wishlisted locations as markers." },
            { src: "../assets/img/projects/panva/settings.jpg", description: "App settings with theme customization options." },
            { src: "../assets/img/projects/panva/dark-mode.jpg", description: "Full app interface in dark mode." },
            { src: "../assets/img/projects/panva/light-mode.jpg", description: "Full app interface in light mode." }
        ],
        links: []
    }
];


// So visitors can easily google tags if they don't know what it is
document.addEventListener("DOMContentLoaded", () => {
    const tags = document.querySelectorAll<HTMLSpanElement>(".skill-tag")

    tags.forEach(tag => {
        tag.style.cursor = "pointer"

        tag.addEventListener("click", () => {
            const text = tag.innerText.trim()
            if (!text) return

            const url = `https://www.google.com/search?q=what+is+${encodeURIComponent(text)} in tech?`
            window.open(url, "_blank", "noopener")
        })
    })
})

// Contact Dropdown Handler
class ContactDropdownHandler {
    private dropdown: HTMLElement | null;
    private toggle: HTMLElement | null;
    private isOpen: boolean = false;

    constructor() {
        this.dropdown = document.getElementById("contact-dropdown");
        this.toggle = document.getElementById("contact-toggle");
    }

    public init(): void {
        if (!this.dropdown || !this.toggle) return;

        // Toggle dropdown on contact link click
        this.toggle.addEventListener("click", (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleDropdown();
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", (e: Event) => {
            if (this.isOpen && this.dropdown && !this.dropdown.contains(e.target as Node)) {
                this.closeDropdown();
            }
        });

        // Close dropdown on escape key
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "Escape" && this.isOpen) {
                this.closeDropdown();
            }
        });

        // Setup contact links
        this.setupContactLinks();
    }

    private toggleDropdown(): void {
        if (this.isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    private openDropdown(): void {
        if (!this.dropdown || !this.toggle) return;

        // Position the dropdown below the Contact link
        const toggleRect = this.toggle.getBoundingClientRect();
        this.dropdown.style.top = `${toggleRect.bottom + 10}px`;
        this.dropdown.style.left = `${toggleRect.left}px`;

        // Show with animation
        this.dropdown.classList.add("active");
        // Use setTimeout to trigger animation after display is set
        setTimeout(() => {
            this.dropdown?.classList.add("show");
            this.dropdown?.classList.remove("hide");
        }, 10);

        this.isOpen = true;
    }

    private closeDropdown(): void {
        if (!this.dropdown) return;

        // Hide with animation
        this.dropdown.classList.add("hide");
        this.dropdown.classList.remove("show");

        // Remove from DOM after animation
        setTimeout(() => {
            this.dropdown?.classList.remove("active");
        }, 200);

        this.isOpen = false;
    }

    private setupContactLinks(): void {
        const githubContact = this.dropdown?.querySelector("[data-service=\"github\"]") as HTMLAnchorElement;
        const linkedinContact = this.dropdown?.querySelector("[data-service=\"linkedin\"]") as HTMLAnchorElement;

        if (githubContact) {
            githubContact.href = CONFIG.github.url;
            githubContact.target = "_blank";
        }

        if (linkedinContact) {
            linkedinContact.href = CONFIG.linkedin.url;
            linkedinContact.target = "_blank";
        }
    }
}

// GitHub Heatmap Generator
class HeatmapGenerator {
    private container: HTMLElement | null;
    private username: string;

    constructor(containerId: string, username: string) {
        this.container = document.getElementById(containerId);
        this.username = username;
    }

    public async generate(): Promise<void> {
        if (!this.container) return;

        // Clear container
        this.container.innerHTML = "";

        // Create canvas element
        const canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "auto";
        canvas.style.borderRadius = "0.5rem"; // Calculated: parent 1.25rem - padding 1.5rem = use fallback 0.5rem
        this.container.appendChild(canvas);

        try {
            // Fetch contribution data from GitHub
            const contributionData = await this.fetchContributionData();

            // Use github-contributions-canvas library to draw the heatmap
            drawContributions(canvas, {
                data: contributionData,
                username: this.username,
                themeName: "dracula",
            });
        } catch (error) {
            console.error("Error generating GitHub heatmap:", error);
            this.container.innerHTML = "<p style=\"color: var(--text-secondary); text-align: center; padding: 2rem;\">Unable to load contribution data</p>";
        }
    }

    private async fetchContributionData(): Promise<any> {
        // Fetch from GitHub's contribution API endpoint
        // Note: This uses a proxy service since GitHub"s GraphQL API requires authentication
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${this.username}`);

        if (!response.ok) {
            throw new Error("Failed to fetch contribution data");
        }

        const rawData = await response.json();

        // Transform data to match the library's expected format
        return this.transformContributionData(rawData);
    }

    private transformContributionData(rawData: any): any {
        // The library expects: { years: [], contributions: [] }
        // The API returns: { total: {}, contributions: [] }

        // Get current year range (Jan 1 to today)
        const today = new Date();
        const currentYear = today.getFullYear();
        const yearStart = new Date(currentYear, 0, 1); // January 1st of current year

        // Filter contributions to only include current year
        const allContributions = rawData.contributions.map((contrib: any) => ({
            date: contrib.date,
            count: contrib.count,
            intensity: contrib.level,
            color: this.getColorForLevel(contrib.level)
        }));

        const contributions = allContributions.filter((contrib: any) => {
            const contribDate = new Date(contrib.date);
            return contribDate >= yearStart && contribDate <= today;
        });

        // Build years array for current year only
        const yearTotal = contributions.reduce((sum: number, c: any) => sum + c.count, 0);
        const dates = contributions.map((c: any) => c.date).sort();

        const years = [{
            year: currentYear.toString(),
            total: yearTotal,
            range: {
                start: dates[0] || `${currentYear}-01-01`,
                end: dates[dates.length - 1] || today.toISOString().split("T")[0]
            }
        }];

        return {
            years: years,
            contributions: contributions
        };
    }

    private getColorForLevel(level: number): string {
        // Dracula theme colors (approximate)
        const colors = [
            "#282a36", // level 0 - background
            "#44475a", // level 1 - dark
            "#bd93f9", // level 2 - purple
            "#ff79c6", // level 3 - pink
            "#ff5555"  // level 4 - red
        ];
        return colors[Math.min(level, 4)] || colors[0];
    }
}

// External Links Handler
class ExternalLinksHandler {
    public init(): void {
        this.setupGitHubLink();
        this.setupLinkedInLink();
    }

    private setupGitHubLink(): void {
        const githubLink = document.getElementById("github-link");
        if (githubLink) {
            githubLink.addEventListener("click", (e: Event) => {
                e.preventDefault();
                window.open(CONFIG.github.url, "_blank");
            });
        }
    }

    private setupLinkedInLink(): void {
        const linkedinLink = document.getElementById("linkedin-link");
        if (linkedinLink) {
            linkedinLink.addEventListener("click", (e: Event) => {
                e.preventDefault();
                window.open(CONFIG.linkedin.url, "_blank");
            });
        }
    }
}

// Repository List Handler
class RepositoryListHandler {
    private repositories: Repository[];

    constructor(repositories: Repository[]) {
        this.repositories = repositories;
    }

    private async fetchOwnerAvatar(owner: string): Promise<string> {
        try {
            const response = await fetch(`https://api.github.com/users/${owner}`);
            if (!response.ok) throw new Error("Failed to fetch owner data");
            const data = await response.json();
            return data.avatar_url;
        } catch (error) {
            console.error(`Error fetching avatar for ${owner}:`, error);
            return "";
        }
    }

    public async populateProjects(): Promise<void> {
        const projectList = document.querySelector(".project-list");
        if (!projectList) return;

        // Clear existing items
        projectList.innerHTML = "";

        // Fetch owner avatars and populate list
        for (const repo of this.repositories) {
            const avatarUrl = await this.fetchOwnerAvatar(repo.owner);

            const item = document.createElement("li");
            item.className = "project-item";

            const iconDiv = document.createElement("div");
            iconDiv.className = "project-icon";
            if (avatarUrl) {
                const img = document.createElement("img");
                img.src = avatarUrl;
                img.alt = `${repo.owner} avatar`;
                iconDiv.appendChild(img);
            }

            const nameSpan = document.createElement("span");
            nameSpan.className = "project-name";
            nameSpan.textContent = repo.name;

            item.appendChild(iconDiv);
            item.appendChild(nameSpan);
            projectList.appendChild(item);
        }
    }
}

// Project Modal Handler
class ProjectModalHandler {
    private modal: HTMLElement | null;
    private currentProject: Project | null = null;

    constructor() {
        this.modal = document.getElementById("project-modal");
    }

    public init(): void {
        if (!this.modal) return;

        // Close modal when clicking outside
        this.modal.addEventListener("click", (e: Event) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Close modal on escape key
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "Escape" && this.modal?.classList.contains("active")) {
                this.closeModal();
            }
        });

        // Close button handler
        const closeBtn = this.modal.querySelector(".modal-close");
        closeBtn?.addEventListener("click", () => this.closeModal());
    }

    public openModal(project: Project): void {
        if (!this.modal) return;

        this.currentProject = project;
        this.populateModal(project);

        this.modal.classList.add("active");
        setTimeout(() => {
            this.modal?.classList.add("show");
        }, 10);
    }

    private closeModal(): void {
        if (!this.modal) return;

        this.modal.classList.remove("show");
        setTimeout(() => {
            this.modal?.classList.remove("active");
        }, 200);
    }

    private populateModal(project: Project): void {
        if (!this.modal) return;

        // Update title
        const titleEl = this.modal.querySelector(".modal-project-title");
        if (titleEl) titleEl.textContent = project.title;

        // Update tagline
        const taglineEl = this.modal.querySelector(".modal-project-tagline");
        if (taglineEl) taglineEl.textContent = project.tagline;

        // Update gallery
        const galleryEl = this.modal.querySelector(".modal-gallery");
        const gallerySectionEl = this.modal.querySelector(".modal-gallery-section") as HTMLElement;
        if (galleryEl && gallerySectionEl) {
            if (project.images.length > 0) {
                // Create gallery wrapper structure
                const galleryWrapper = document.createElement("div");
                galleryWrapper.className = "image-gallery-wrapper";

                // Create gallery container
                const container = document.createElement("div");
                container.className = "gallery-container";

                // Add images
                project.images.forEach((image, index) => {
                    const img = document.createElement("img");
                    img.src = image.src;
                    img.alt = `${project.title} screenshot ${index + 1}`;
                    img.className = "gallery-image";
                    img.dataset.description = image.description;
                    if (index === 0) img.classList.add("active");
                    container.appendChild(img);
                });

                // Add navigation arrows
                const leftArrow = document.createElement("button");
                leftArrow.className = "gallery-arrow gallery-arrow-left";
                leftArrow.textContent = "←";
                container.appendChild(leftArrow);

                const rightArrow = document.createElement("button");
                rightArrow.className = "gallery-arrow gallery-arrow-right";
                rightArrow.textContent = "→";
                container.appendChild(rightArrow);

                galleryWrapper.appendChild(container);

                // Clear and append
                galleryEl.innerHTML = "";
                galleryEl.appendChild(galleryWrapper);
                gallerySectionEl.style.display = "block";

                // Initialize gallery after DOM update
                setTimeout(() => this.initializeGallery(galleryWrapper), 10);
            } else {
                gallerySectionEl.style.display = "none";
            }
        }

        // Update about
        const aboutEl = this.modal.querySelector(".modal-about-text");
        if (aboutEl) aboutEl.textContent = project.about;

        // Update features
        const featuresEl = this.modal.querySelector(".modal-features-list");
        if (featuresEl) {
            featuresEl.innerHTML = project.features
                .map(feature => `<li>${feature}</li>`)
                .join("");
        }

        // Update links
        const linksEl = this.modal.querySelector(".modal-links");
        if (linksEl) {
            if (project.links.length > 0) {
                linksEl.innerHTML = project.links
                    .map(link => `
                        <a href="${link.url}" class="modal-link-button" target="_blank" rel="noopener noreferrer">
                            ${link.label}
                        </a>
                    `)
                    .join("");
            } else {
                linksEl.innerHTML = "<p class=\"no-links\">No public links available</p>";
            }
        }
    }

    private initializeGallery(galleryWrapper: HTMLElement): void {
        const container = galleryWrapper.querySelector(".gallery-container") as HTMLElement;
        const images = galleryWrapper.querySelectorAll(".gallery-image") as NodeListOf<HTMLImageElement>;
        const leftArrow = galleryWrapper.querySelector(".gallery-arrow-left") as HTMLButtonElement;
        const rightArrow = galleryWrapper.querySelector(".gallery-arrow-right") as HTMLButtonElement;
        let currentIndex = 0;
        let autoScrollInterval: number | null = null;

        // Set initial background
        if (container && images.length > 0 && images[0].src) {
            container.style.setProperty("--bg-image", `url('${images[0].src}')`);
        }

        // Function to show image at specific index
        const showImage = (index: number) => {
            images.forEach(img => img.classList.remove("active"));
            images[index].classList.add("active");
            currentIndex = index;

            // Update background image
            if (container && images[index].src) {
                container.style.setProperty("--bg-image", `url('${images[index].src}')`);
            }
        };

        // Next image
        const nextImage = () => {
            const nextIndex = (currentIndex + 1) % images.length;
            showImage(nextIndex);
        };

        // Previous image
        const prevImage = () => {
            const prevIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(prevIndex);
        };

        // Auto-scroll every 5 seconds
        const startAutoScroll = () => {
            stopAutoScroll();
            autoScrollInterval = window.setInterval(nextImage, 5000);
        };

        const stopAutoScroll = () => {
            if (autoScrollInterval !== null) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        };

        // Arrow button events
        if (leftArrow) {
            leftArrow.addEventListener("click", (e: Event) => {
                e.stopPropagation();
                stopAutoScroll();
                prevImage();
                startAutoScroll();
            });
        }

        if (rightArrow) {
            rightArrow.addEventListener("click", (e: Event) => {
                e.stopPropagation();
                stopAutoScroll();
                nextImage();
                startAutoScroll();
            });
        }

        // Click image to enlarge (open in new tab)
        if (container) {
            container.addEventListener("click", (e: Event) => {
                const target = e.target as HTMLElement;
                if (!target.classList.contains("gallery-arrow") && !target.closest(".gallery-arrow")) {
                    const activeImage = images[currentIndex];
                    if (activeImage) {
                        window.open(activeImage.src, "_blank");
                    }
                }
            });
        }

        // Pause auto-scroll on hover
        galleryWrapper.addEventListener("mouseenter", stopAutoScroll);
        galleryWrapper.addEventListener("mouseleave", startAutoScroll);

        // Start auto-scroll
        if (images.length > 1) {
            startAutoScroll();
        }
    }

    public populateProjectsPage(): void {
        const grid = document.querySelector(".projects-grid");
        if (!grid) return;

        grid.innerHTML = "";

        PROJECTS.forEach(project => {
            const card = document.createElement("div");
            card.className = "project-card";
            card.style.cursor = "pointer";

            // Get the preview image (first image in the array)
            const previewImage = project.images.length > 0 ? project.images[0].src : "";
            const imageStyle = previewImage ? `style="background-image: url('${previewImage}'); background-size: cover; background-position: center;"` : "";

            card.innerHTML = `
                <div class="project-card-image" ${imageStyle}></div>
                <h3 class="project-card-title">${project.title}</h3>
                <p class="project-card-meta">${project.tagline}</p>
            `;

            card.addEventListener("click", () => this.openModal(project));
            grid.appendChild(card);
        });
    }
}

// Main App
class App {
    private contactDropdownHandler: ContactDropdownHandler;
    private heatmapGenerator: HeatmapGenerator;
    private repositoryListHandler: RepositoryListHandler;
    private projectModalHandler: ProjectModalHandler;

    constructor() {
        this.contactDropdownHandler = new ContactDropdownHandler();
        this.heatmapGenerator = new HeatmapGenerator("heatmap", CONFIG.github.username);
        this.repositoryListHandler = new RepositoryListHandler(CONFIG.repositories);
        this.projectModalHandler = new ProjectModalHandler();
    }

    public async init(): Promise<void> {
        // Setup contact dropdown
        this.contactDropdownHandler.init();

        // Setup project modal
        this.projectModalHandler.init();

        // Generate heatmap if on home page
        if (document.getElementById("heatmap")) {
            await this.heatmapGenerator.generate();
            await this.repositoryListHandler.populateProjects();
        }

        // Populate projects page if on projects page
        if (document.querySelector(".projects-grid")) {
            this.projectModalHandler.populateProjectsPage();
        }

        console.log("Portfolio site initialized successfully!");
    }
}

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    const app = new App();
    app.init();

    // Expose app instance for customization
    (window as any).portfolioApp = app;
});

export { App, HeatmapGenerator, ExternalLinksHandler, ContactDropdownHandler };
