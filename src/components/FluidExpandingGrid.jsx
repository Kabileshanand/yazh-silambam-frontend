import React, { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { cn } from "../lib/utils";

const DEFAULT_ITEMS = [
  {
    id: "SNS Academy",
    title: "SNS Academy",
    subtitle: "Traditional salutations and cultural showcases",
    image: "/Events/SNS Academy.jpg",
    color: "#ba0f16",
  },
  {
    id: "Sarada School",
    title: "Sarada School",
    subtitle: "Alangara Silambam emphasizes aesthetic, flowing displays for events and cultural shows",
    image: "/Events/Sarada school.jpeg",
    color: "#ba0f16",
  },
  {
    id: "Sona College",
    title: "Sona College",
    subtitle: "Weaponry program showcase",
    image: "/Events/Sona College.jpeg",
    color: "#ba0f16",
  },
];

export function FluidExpandingGrid({
  items = DEFAULT_ITEMS,
  className,
  id = "fluid-gallery",
}) {
  const [layout, setLayout] = useState(() => {
    const ids = items.map((item) => item.id);
    return {
      row1: ids.slice(0, 2),
      row2: ids.slice(2, Math.min(items.length, 4)),
    };
  });

  const handleExpand = (id) => {
    const inRow1 = layout.row1.includes(id);
    const inRow2 = layout.row2.includes(id);

    if (
      (inRow1 && layout.row1.length === 1) ||
      (inRow2 && layout.row2.length === 1)
    )
      return;

    if (inRow1) {
      const neighbor = layout.row1.find((i) => i !== id);
      setLayout({
        row1: [id],
        row2: [neighbor, ...layout.row2.filter((i) => i !== neighbor)].slice(
          0,
          2
        ),
      });
    } else {
      const neighbor = layout.row2.find((i) => i !== id);
      setLayout({
        row1: [neighbor, ...layout.row1.filter((i) => i !== neighbor)].slice(
          0,
          2
        ),
        row2: [id],
      });
    }
  };

  return (
    <div className={cn("fluid-gallery-container", className)}>
      <div className="fluid-gallery-wrapper">
        <LayoutGroup id={id}>
          <motion.div layout className="fluid-grid">
            {items.map((item) => {
              const isRow1 = layout.row1.includes(item.id);
              const rowArr = isRow1 ? layout.row1 : layout.row2;
              const isSelected = rowArr.length === 1 && rowArr[0] === item.id;

              const gridRow = isRow1 ? 1 : 2;
              let gridColumn = "";
              if (isSelected) {
                gridColumn = "1 / span 2";
              } else {
                if (isRow1) {
                  gridColumn = layout.row1.indexOf(item.id) === 0 ? "1" : "2";
                } else {
                  gridColumn = layout.row2.indexOf(item.id) === 0 ? "1" : "2";
                }
              }

              return (
                <motion.div
                  key={item.id}
                  layoutId={`${id}-${item.id}`}
                  onClick={() => handleExpand(item.id)}
                  style={{ gridRow, gridColumn }}
                  className={cn(
                    "fluid-grid-item",
                    isSelected ? "z-30" : "z-10"
                  )}
                  transition={{
                    layout: {
                      type: "spring",
                      stiffness: 100,
                      damping: 25,
                    },
                  }}
                >
                  <motion.div
                    layoutId={`${id}-${item.id}-mask-wrapper`}
                    className="fluid-mask-wrapper"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className={cn(
                        "fluid-image",
                        isSelected ? "selected" : "unselected"
                      )}
                    />
                    <motion.div
                      layoutId={`${id}-${item.id}-mask`}
                      className={cn(
                        "fluid-mask",
                        isSelected ? "selected" : "unselected"
                      )}
                    />
                  </motion.div>

                  <motion.div
                    layout="position"
                    className="fluid-content"
                  >
                    <motion.div layout="position" style={{ overflow: "hidden" }}>
                      <motion.h3
                        layout="position"
                        className="fluid-title"
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p
                        layout="position"
                        className="fluid-subtitle"
                      >
                        {item.subtitle}
                      </motion.p>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    layoutId={`${id}-${item.id}-overlay`}
                    className="fluid-overlay"
                  />
                  <motion.div
                    layoutId={`${id}-${item.id}-border`}
                    className="fluid-border"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}

export default FluidExpandingGrid;
