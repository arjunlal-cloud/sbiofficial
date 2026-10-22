export const APPLICATION_LINKS = {
  chapter: "/apply",
  businessRequest: "/request",
  studentSupportTeam:
    "https://docs.google.com/forms/d/16H_5sU03cJnv2lYYlE2311UYtBx-OVw53ngVBGM6opc/viewform",
} as const;

export const GOOGLE_FORM_FALLBACKS = {
  chapter:
    "https://docs.google.com/forms/d/1v1HwPRPeFm87FyT4HGVMMnwyHFn6khd_Z-j2XFp2Y1Q/viewform",
  businessRequest:
    "https://docs.google.com/forms/d/e/1FAIpQLSe-rm4vbP6Bkte7mILxS8CEHcrtabHW80qUrEat2kKHOSvbFw/viewform",
} as const;

export const PUBLIC_CONTACT_EMAIL = "sbi.official@gmail.com";

export type ServiceId =
  | "website"
  | "promotional-video"
  | "google-business-profile"
  | "social-media-setup";

/** Existing-site services. A location lists only the offerings verified for that chapter. */
export const NETWORK_SERVICES: ReadonlyArray<{ id: ServiceId; label: string }> = [
  { id: "website", label: "Website development" },
  { id: "promotional-video", label: "Promotional videos" },
  { id: "google-business-profile", label: "Google Business Profile help" },
  { id: "social-media-setup", label: "Social media setup" },
];

export type ChapterLocation = {
  slug: string;
  city: string;
  region: string;
  serviceIds: readonly ServiceId[];
  contactUrl?: string;
};

/**
 * Verified public chapter locations. The supplied information does not include
 * service lists or direct contacts for individual chapters; do not infer them.
 */
export const CHAPTER_LOCATIONS: readonly ChapterLocation[] = [
  {
    slug: "east-brunswick-new-jersey",
    city: "East Brunswick",
    region: "New Jersey",
    serviceIds: [],
  },
  {
    slug: "guadalajara-mexico",
    city: "Guadalajara",
    region: "Mexico",
    serviceIds: [],
  },
  {
    slug: "simi-valley-california",
    city: "Simi Valley",
    region: "California",
    serviceIds: [],
  },
];
