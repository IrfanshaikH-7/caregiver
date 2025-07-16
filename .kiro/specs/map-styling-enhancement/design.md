# Design Document: Map Styling Enhancement

## Overview

The Map Styling Enhancement feature will update the LocationMap component to ensure that maps are displayed with a square aspect ratio and have rounded corners with a 16px border radius. This design change will improve the visual consistency of the application and align the map component with the established design system.

## Architecture

This enhancement will modify the existing LocationMap component without changing its core functionality or interface. The changes will be purely presentational and will not affect the component's behavior or integration with other parts of the application.

## Components and Interfaces

### LocationMap Component

The LocationMap component will maintain its current interface:

```typescript
interface LocationMapProps {
  location: {
    lat: number | null;
    long: number | null;
  };
  address?: string;
  title?: string;
}
```

No changes to the component's props or functionality are required for this enhancement.

## Implementation Details

### Current Implementation

Currently, the map container has the following styling:

```jsx
<div className="h-map w-map md:w-map">
  <iframe
    title={`${title} Map`}
    width="100%"
    height="100%"
    style={{ border: 0 }}
    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${location.lat},${location.long}&zoom=15`}
    allowFullScreen
  ></iframe>
</div>
```

The current Tailwind configuration defines:

- `w-map` as `243px`
- `h-map` as `178px`

This creates a rectangular map rather than a square one.

### Proposed Changes

1. **Update the map container styling:**

   - Add `rounded-button` class to apply the 16px border radius (already defined in the Tailwind config)
   - Add `overflow-hidden` to ensure content doesn't extend beyond the rounded corners
   - Modify the height and width to ensure a square aspect ratio

2. **Tailwind Configuration:**
   - No changes needed to the Tailwind configuration as we'll use the existing `rounded-button` class which is already defined as `16px`
   - We'll use the existing width class `w-map` (243px) and make the height match this value for a square aspect ratio

### CSS Implementation

The updated map container will have the following styling:

```jsx
<div className="h-[243px] w-map md:w-map rounded-button overflow-hidden">
  <iframe
    title={`${title} Map`}
    width="100%"
    height="100%"
    style={{ border: 0 }}
    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${location.lat},${location.long}&zoom=15`}
    allowFullScreen
  ></iframe>
</div>
```

This approach:

1. Sets the height to match the width (243px) using Tailwind's arbitrary value syntax
2. Applies the 16px border radius using the existing `rounded-button` class
3. Adds `overflow-hidden` to ensure the iframe content respects the rounded corners

## Responsive Design

The component will maintain its current responsive behavior:

- On mobile devices, the map will have a width and height of 243px
- On medium screens and larger (md breakpoint), the map will use the `md:w-map` class for width while maintaining the square aspect ratio

## Testing Strategy

1. **Visual Testing:**

   - Verify that the map appears square with rounded corners in all supported browsers
   - Confirm that the map displays correctly on different screen sizes
   - Ensure the iframe content doesn't overflow the rounded corners

2. **Integration Testing:**
   - Verify that the LocationMap component still functions correctly with the updated styling
   - Confirm that the map is displayed correctly in all places where the LocationMap component is used

## UI Design

### Before

```
+-------------------------------------------+
|                                           |
|                                           |
|             Rectangular Map               |
|             (243px × 178px)               |
|             (Sharp Corners)               |
|                                           |
+-------------------------------------------+
```

### After

```
+-------------------------------------------+
|                                           |
|      ╭─────────────────────────────╮      |
|      │                             │      |
|      │                             │      |
|      │         Square Map          │      |
|      │        (243px × 243px)      │      |
|      │                             │      |
|      │                             │      |
|      ╰─────────────────────────────╯      |
|                                           |
+-------------------------------------------+
```

The updated design maintains the same width but increases the height to match, creating a perfect square with rounded corners that align with the application's design system.
