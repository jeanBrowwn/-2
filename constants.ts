
export const STEPS_DATA = [
  {
    id: 1,
    title: "Image Analysis & Decomposition",
    goal: 'Analyze the original image from "{PROJECT_ADDRESS}" with AI, decomposing it into four precise parts to build foundational synthesis data.',
    confirmation: "Does the initial analysis of the environment, removal area, and context seem correct? Ready to proceed to Step 2?",
    sections: [
      {
        title: "1. Complete Image Analysis",
        keyword: "Original_Image_Complete_Analysis",
        details: [
          {
            title: "Image Preprocessing",
            items: [
              { key: "Normalization", value: "518x518 Complete" },
              { key: "Metadata", value: "EXIF/GPS Extracted" },
              { key: "Quality Score", value: "97/100" },
            ],
          },
          {
            title: "Feature & Structure Analysis",
            items: [
              { key: "DINOv2 Features", value: "1024-dim vector OK" },
              { key: "3D VAE Prediction", value: "Spatial Depth Analyzed" },
              { key: "Key Objects", value: "Building/Road/Vehicles" },
            ],
          },
        ],
      },
      {
        title: "2. 4-Part Precision Decomposition",
        keyword: "Four_Parts_Precision_Decomposition",
        details: [
          {
            title: "Part 1 & 2: Areas",
            items: [
              { key: "P1: Preservation Area", value: "Surrounding landscape/buildings" },
              { key: "P2: Removal Area", value: "{EXISTING_BUILDING_DESC}" },
              { key: "Accuracy", value: "95% Object Isolation" },
            ],
          },
          {
            title: "Part 3 & 4: Context",
            items: [
              { key: "P3: Environmental Context", value: "Natural light/shadows quantified" },
              { key: "P4: Synthesis Parameters", value: "Camera/Resolution/Color set" },
              { key: "Readiness", value: "All parameters quantified" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Extraction & Background Restoration",
    goal: 'Isolate "{EXISTING_BUILDING_DESC}" with 95% accuracy and establish a plan for background restoration.',
    confirmation: "Are the removal scope and background restoration plan appropriate? Shall we proceed to Step 3 with the defined new building constraints (Max 5 floors, 800m²)?",
    sections: [
      {
        title: "1. Precision Masking & Removal Zone",
        keyword: "Precision_Masking_Removal_Zone_Definition",
        details: [
          {
            title: "Building Masking",
            items: [
              { key: "Masking Accuracy", value: "95.8% Achieved" },
              { key: "Boundary Definition", value: "Pixel-level XY coords set" },
              { key: "Alpha Mask Layers", value: "3 (Primary/Secondary/Tertiary)" },
            ],
          },
          {
            title: "Impact Area Analysis",
            items: [
              { key: "Shadow Impact", value: "Calculated for 2 PM" },
              { key: "Reflection Effect", value: "Adjacent surfaces mapped" },
              { key: "Visual Occlusion", value: "New background exposure: 45m²" },
            ],
          },
        ],
      },
      {
        title: "2. Background Restoration & Regulation",
        keyword: "Background_Restoration_Regulation_Verification",
        details: [
          {
            title: "Restoration Plan",
            items: [
              { key: "Occluded Surfaces", value: "Pavement/sidewalk patterns restored" },
              { key: "Pedestrian Flow", value: "Continuous path ensured" },
              { key: "Infrastructure", value: "Utility lines seamlessly connected" },
            ],
          },
          {
            title: "Building Code Verification",
            items: [
              { key: "Zoning/Density", value: "Compliance confirmed" },
              { key: "Max Height", value: "20m limit verified" },
              { key: "Setback", value: "3m from boundary line required" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "New Style Deconstruction",
    goal: 'Normalize the provided "{NEW_ARCHITECTURE_STYLE}" using ASNE technology and analyze its environmental adaptability at "{PROJECT_ADDRESS}".',
    confirmation: "Does the style analysis align with your intent? With an adaptability score of 88/100 and gap mitigation strategies in place, shall we proceed to Step 4?",
    sections: [
      {
        title: "1. ASNE Pipeline Style Normalization",
        keyword: "ASNE_Pipeline_Style_Normalization",
        details: [
          {
            title: "Style Classification",
            items: [
              { key: "Primary Style", value: "Modern Modular (93.2%)" },
              { key: "Core Concept", value: "Seamless Indoor-Outdoor Living" },
              { key: "Period", value: "Contemporary (2020s)" },
            ],
          },
          {
            title: "Vector & Ontology",
            items: [
              { key: "Style Vector", value: "128-dim normalized" },
              { key: "Geometric Score", value: "8.5/10 (Rectilinear)" },
              { key: "Material Score", value: "9.1/10 (Natural)" },
            ],
          },
        ],
      },
      {
        title: "2. Environmental Adaptation & Gap Detection",
        keyword: "Environmental_Adaptation_Gap_Detection",
        details: [
          {
            title: "Contextual Harmony Analysis",
            items: [
              { key: "Scale Harmony", value: "92/100 (Matches surroundings)" },
              { key: "Material Compatibility", value: "85/100 (Contrast & complement)" },
              { key: "Style Integration", value: "87/100 (Modern yet respectful)" },
            ],
          },
          {
            title: "Gap Detection & Mitigation",
            items: [
              { key: "Visual Noise Risk", value: "Low (22/100)" },
              { key: "Material Misrepresentation", value: "Low (18/100)" },
              { key: "Mitigation Strategy", value: "Generated for all gaps" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Context Reassembly & Synthesis Plan",
    goal: "Logically reassemble the four decomposed parts using Rectified Flow, creating a complete synthesis plan with physical validity.",
    confirmation: "Is the reassembly plan and target realism of 98% appropriate? Do you approve the application of 'Material Variation' and 'Usage Traces' imperfection patterns before proceeding to Step 5?",
    sections: [
      {
        title: "1. Rectified Flow 4-Part Integration",
        keyword: "Rectified_Flow_Four_Parts_Integration",
        details: [
          {
            title: "Integration Sequence",
            items: [
              { key: "Phase A (0-25%)", value: "Set Preservation Baseline" },
              { key: "Phase B (25-50%)", value: "Execute Removal & Restoration" },
              { key: "Phase C (50-80%)", value: "Place New Architecture" },
              { key: "Phase D (80-100%)", value: "Integrate Environmental Context" },
            ],
          },
          {
            title: "Optimization & Refinement",
            items: [
              { key: "Weighted Loss", value: "50% focus on removal zone" },
              { key: "Iteration Plan", value: "3-stage progressive refinement" },
              { key: "Target Realism", value: "98% convergence threshold" },
            ],
          },
        ],
      },
      {
        title: "2. Physical Reality & Imperfection",
        keyword: "Physical_Reality_Validation_Imperfection_Application",
        details: [
          {
            title: "Physical Validation",
            items: [
              { key: "Structural Stability", value: "99/100 (Verified)" },
              { key: "Material Durability", value: "Grade A for local climate" },
              { key: "Environmental Impact", value: "Sunlight/Wind analysis OK" },
            ],
          },
          {
            title: "Imperfection Application",
            items: [
              { key: "Selected Templates", value: "Material Variation, Usage Traces" },
              { key: "Temporal Consistency", value: "New/old elements age harmoniously" },
              { key: "Lived-in Feel", value: "Subtle usage patterns planned" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Creative GPS Keyword Generation",
    goal: 'Based on all prior steps, build a POSI-GAP-NEG triangular balance system and generate creative GPS keywords for "{PROJECT_ADDRESS}".',
    confirmation: "Do the generated keywords and the creative balance (40:30:25) match your intent? After any adjustments, shall we proceed to the final step?",
    sections: [
      {
        title: "1. POSI-GAP-NEG Triangle Balance",
        keyword: "Creative_GPS_Triangle_Balance_Calculation",
        details: [
          {
            title: "Balance Matrix (40:30:25:5)",
            items: [
              { key: "POSITIVE (40%)", value: "Core Intent: {NEW_ARCHITECTURE_STYLE}" },
              { key: "NEGATIVE (30%)", value: "Boundaries: No visual clashes" },
              { key: "LATENT GAP (25%)", value: "AI Freedom: Lighting creativity" },
              { key: "SUPPORT (5%)", value: "Technical: Realism enhancement" },
            ],
          },
          {
            title: "User Control",
            items: [
              { key: "Balance Ratio", value: "Accuracy 70% vs Creativity 30%" },
              { key: "Priority", value: "Contextual Harmony" },
              { key: "Navigation", value: "GPS system configured" },
            ],
          },
        ],
      },
      {
        title: "2. Three-Perspective Keyword Pools",
        keyword: "Three_Perspective_Keywords_Technical_Coordinates",
        details: [
          {
            title: "Keyword Perspectives",
            items: [
              { key: "Photographer", value: "Golden hour, 24mm lens, leading lines" },
              { key: "Architect", value: "Steel frame, board-marked concrete" },
              { key: "Editor", value: "Contemplative, human-scale intimacy" },
            ],
          },
          {
            title: "Technical Coordinates",
            items: [
              { key: "Camera", value: "1.5m height, 35mm, f/8" },
              { key: "Lighting", value: "5600K Daylight, side-lit 45°" },
              { key: "Quality", value: "2048px, 50 steps, 7.5 guidance" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Final Synthesis & Template Generation",
    goal: "Integrate all results via a multimodal reflection system and generate the final, complete 'Template_Synthesis_Prompt'.",
    confirmation: "The final synthesis prompt is complete and optimized for multiple platforms. Are you ready to generate the final image?",
    sections: [
      {
        title: "1. Multimodal Progressive Completion",
        keyword: "Multimodal_Reflection_Progressive_Completion",
        details: [
          {
            title: "Self-Correction System",
            items: [
              { key: "Syntax Accuracy", value: "99/100" },
              { key: "Semantic Consistency", value: "97/100" },
              { key: "Final Quality Score", value: "98.5/100" },
            ],
          },
          {
            title: "Platform Optimization",
            items: [
              { key: "Image Editing Model", value: "Optimized" },
              { key: "Text-to-Image Model", value: "Optimized" },
              { key: "Compatibility", value: "99/100" },
            ],
          },
        ],
      },
      {
        title: "2. Template_Synthesis_Prompt Generation",
        keyword: "Template_Synthesis_Prompt_Final_Generation",
        details: [
          {
            title: "Core Command Assembly",
            items: [
              { key: "Integration System", value: "4-Part System locked" },
              { key: "Creative GPS", value: "40:30:25 balance applied" },
              { key: "Quality Metrics", value: "98% realism target integrated" },
            ],
          },
          {
            title: "Final Template",
            items: [
              { key: "Keyword Pools", value: "All perspectives mapped" },
              { key: "Imperfections", value: "Patterns integrated" },
              { key: "Status", value: "Template generation complete" },
            ],
          },
        ],
      },
    ],
  },
];
