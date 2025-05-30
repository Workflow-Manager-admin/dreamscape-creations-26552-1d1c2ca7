import React, { useState, useRef } from "react";
import axios from "axios";

// Dreamscape color palette
const COLORS = {
  primary: "#0d0d0d",
  secondary: "#F8F8FF",
  accent: "#029fed",
  gradientStart: "#96c7ff",
  gradientEnd: "#e7e6ff"
};

/**
 * PUBLIC_INTERFACE
 * Main container component for DreamScape Creations.
 * Allows user to input a dream, choose generation mode, displays generated results, and provides download/share options.
 */
function DreamScapeContainer() {
  const [dream, setDream] = useState("");
  const [mode, setMode] = useState("art"); // 'art' or 'story'
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { type: 'art', url } or { type: 'story', text }
  const resultRef = useRef(null);

  // Simulates AI generation by returning a thematic placeholder based on dream input
  const handleGenerate = async () => {
    if (!dream.trim()) return;
    setLoading(true);
    setResult(null);
    await new Promise((res) => setTimeout(res, 1400 + Math.random() * 800));

    // NATURAL LANGUAGE TEMPLATE SYSTEM STARTS HERE

    /**
     * PUBLIC_INTERFACE
     * Generates both an art description and a story that explicitly and clearly reference
     * the user's dream phrase in a template-driven, paraphrased style.
     * If no strong theme match is found, always embed the prompt in both fields.
     * This ensures perfect alignment of user intent, visible keywording, and personalization for both outputs.
     */
    function generateDreamOutputs(text) {
      const lc = text.toLowerCase();
      const trimmedInput = text.trim();
      const inputPhrase = trimmedInput.length > 0 ? trimmedInput : "my dream";

      // Define templates for themed generations
      const templates = [
        {
          name: "haunted house",
          keywords: ["haunted house", "ghost", "spooky"],
          art: (phrase) =>
            `A surreal haunted house scene based directly on the dream: "${phrase}". Ominous shadows, eerie lights, and ghostly whispers fill the night air.`,
          url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=800&q=80",
          story: (phrase) =>
            `Last night I dreamed of "${phrase}". As I stepped into the haunted house, fog hugged the floorboards, and every corner felt alive. Upstairs, a door creaked—beyond lay a room thick with old secrets and invisible presences. The dream left me chilled, certain that "${phrase}" and I were not alone.`
        },
        {
          name: "forest",
          keywords: ["forest", "woods", "trees"],
          art: (phrase) =>
            `A surreal, mist-filled forest generated from "${phrase}". Twisting trunks, glowing moss, and shimmering moonbeams evoke dream-like wandering.`,
          url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=600&q=80",
          story: (phrase) =>
            `In my dream of "${phrase}", I wandered beneath trees so tall their leaves fused with starlight. The entire woods seemed to breathe as I walked, and every path led deeper into a world shaped by "${phrase}".`
        },
        {
          name: "ocean",
          keywords: ["ocean", "sea", "wave"],
          art: (phrase) =>
            `Dreamscape of endless waves and luminous tides based on "${phrase}". The sea glows in supernatural hues under a cosmic sky.`,
          url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=800&q=80",
          story: (phrase) =>
            `Floating above the water in my dream of "${phrase}", brilliant fish leapt in arcs and the tides hummed with ancient songs. The coastline blurred, shaped by my desire for "${phrase}" to be endless.`
        },
        {
          name: "mountain",
          keywords: ["mountain", "peak", "hill"],
          art: (phrase) =>
            `A fantastical mountain summit inspired by "${phrase}": pastel clouds, swirling eagles, and a magical windswept peak.`,
          url: "https://images.unsplash.com/photo-1465101178521-c1a9136a37bf?fit=crop&w=800&q=80",
          story: (phrase) =>
            `In my dream I scaled a mountain called "${phrase}". Golden sunlight spilled across the summit as I looked down at a world distant and unreal, the peak secretive and inviting.`
        },
        {
          name: "city",
          keywords: ["city", "urban", "skyscraper"],
          art: (phrase) =>
            `A futuristic cityscape, directly channeling "${phrase}" with neon rivers, endless skyscrapers, and swirling night fog.`,
          url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?fit=crop&w=800&q=80",
          story: (phrase) =>
            `In my urban dream of "${phrase}", the city pulsed with electric color and infinite possibility. I ran through lavender-lit streets, every sign and shadow shaped by the idea of "${phrase}".`
        },
        {
          name: "desert",
          keywords: ["desert", "sand", "dune"],
          art: (phrase) =>
            `A shifting desert dream, visualizing "${phrase}". Golden dunes, distant mirages, and ancient, whispering winds fill the landscape.`,
          url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?fit=crop&w=800&q=80",
          story: (phrase) =>
            `My dream took me across endless sands, where every dune spelled out "${phrase}". The sun gleamed overhead, and I wandered between mirages, always returning to the central mystery of "${phrase}".`
        }
      ];

      // Attempt a thematic match
      for (let t of templates) {
        if (t.keywords.some((k) => lc.includes(k))) {
          return {
            art: {
              url: t.url,
              alt: t.art(inputPhrase),
              prompt: `Dream prompt: "${inputPhrase}"`,
              description: t.art(inputPhrase)
            },
            story: t.story(inputPhrase)
          };
        }
      }
      // Otherwise, fallback: abstract explicit template always referencing user phrase
      return {
        art: {
          url: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?fit=crop&w=800&q=80",
          alt: `A dreamy scene uniquely created for "${inputPhrase}": clouds twist, staircases loop, and colors pulse—a surreal vision of your dream.`,
          prompt: `Dream prompt: "${inputPhrase}"`,
          description: `A dreamy scene uniquely created for "${inputPhrase}": clouds twist, staircases loop, and colors pulse—a surreal vision of your dream.`
        },
        story: `In my dream, "${inputPhrase}" blossomed into a world of changing colors, impossible landscapes, and experiences that could only come from my own memory of "${inputPhrase}".`
      };
    }

    // Main handleGenerate now uses the strict template system, always passing the user's phrase to both outputs.
    if (mode === "art") {
      const gen = generateDreamOutputs(dream);
      setResult({
        type: "art",
        url: gen.art.url,
        alt: gen.art.alt,
        prompt: gen.art.prompt,
        description: gen.art.description
      });
    } else {
      const gen = generateDreamOutputs(dream);
      setResult({
        type: "story",
        text: gen.story
      });
    }
    setLoading(false);
  };

  const handleDownload = () => {
    if (!result) return;
    if (result.type === "art") {
      const link = document.createElement("a");
      link.href = result.url;
      link.download = "dreamscape-art.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (result.type === "story") {
      const blob = new Blob([result.text], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "dreamscape-story.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (!result) return;
    let shareData;
    if (result.type === "art") {
      shareData = {
        title: "Dreamscape Art",
        text: "Check out this AI-generated dream art from my dream:",
        url: result.url
      };
    } else {
      shareData = {
        title: "Dreamscape Story",
        text: "Check out this AI-generated dream story:\n" + result.text
      };
    }
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled or not supported
      }
    } else {
      // Fallback: copy link or text
      if (result.type === "art") {
        navigator.clipboard.writeText(result.url);
        alert("Art URL copied to clipboard!");
      } else {
        navigator.clipboard.writeText(result.text);
        alert("Story copied to clipboard!");
      }
    }
  };

  // Styling
  const containerStyles = {
    minHeight: "80vh",
    marginTop: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "radial-gradient(circle at 60% 20%, " + COLORS.gradientStart +
      " 0%, " + COLORS.gradientEnd + " 100%)",
    transition: "background 0.6s"
  };
  const boxStyles = {
    background: "rgba(244,248,255,0.88)",
    borderRadius: "2.5rem",
    boxShadow: "0 6px 24px rgba(2,45,110,0.15), 0 1.5px 4px #d6ebfc",
    padding: "2.25rem 2.75rem",
    width: "100%",
    maxWidth: 500,
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  };

  const dreamyGlow = {
    boxShadow: "0 0 40px 0 " + COLORS.accent + "55, 0 2px 12px " + COLORS.primary + "22"
  };

  return (
    <div style={containerStyles}>
      <div style={{ ...boxStyles, ...dreamyGlow }}>
        <h2
          style={{
            fontFamily: "'Pacifico', cursive, serif",
            fontWeight: 600,
            letterSpacing: "0.08em",
            marginBottom: "0.6em",
            color: COLORS.primary,
            textShadow: "0 2px 24px " + COLORS.gradientStart + "9b"
          }}
        >
          DreamScape Creations
        </h2>
        <div style={{ color: "#719cd6", fontSize: "1.07rem", marginBottom: 24 }}>
          Transform your dream into surreal art or story 🌙
        </div>

        <textarea
          style={{
            width: "100%",
            border: "1.7px solid " + COLORS.accent + "44",
            borderRadius: "1.5rem",
            outline: "none",
            resize: "vertical",
            minHeight: "80px",
            background: "linear-gradient(100deg, #eef4ff 65%, #e8f8fd 100%)",
            padding: "1em",
            fontSize: "1rem",
            marginBottom: 15,
            fontFamily: "inherit",
            color: COLORS.primary,
            boxShadow: "0 2.5px 16px 0 #abcffb18"
          }}
          placeholder="Describe your last dream, as wild and vivid as you remember..."
          value={dream}
          onChange={e => setDream(e.target.value)}
          disabled={loading}
          maxLength={600}
        />

        <div style={{
          display: "flex",
          gap: 20,
          justifyContent: "center",
          margin: "10px 0 28px 0"
        }}>
          <DreamyToggle
            selected={mode}
            options={[
              { key: "art", label: "Generate Art 🎨" },
              { key: "story", label: "Generate Story 📖" }
            ]}
            onToggle={setMode}
            disabled={loading}
          />
        </div>

        <button
          className="btn btn-large"
          style={{
            width: "100%",
            fontSize: "1.13rem",
            borderRadius: "1.7rem",
            marginBottom: "1.1rem",
            background: loading
              ? "repeating-linear-gradient(-25deg, #93cef6 0 25px, #f8f8ff 25px 50px)"
              : COLORS.accent,
            color: loading ? "#2367b5" : "#fff",
            transition: "all 0.18s"
          }}
          disabled={loading || !dream.trim()}
          onClick={handleGenerate}
        >
          {loading
            ? (mode === "art" ? "Painting..." : "Spinning a story...")
            : (mode === "art" ? "Dream into Art" : "Dream into Story")}
        </button>

        {result && (
          <div
            ref={resultRef}
            style={{
              margin: "0.5em 0 0 0",
              borderRadius: "1.2rem",
              background: "linear-gradient(120deg, #e7effd77 75%, #f8f8ffcc 100%)",
              boxShadow: "0 2px 20px #93cef666",
              padding: "1.4em 1.1em",
              minHeight: 140,
              marginBottom: "1.1em",
              position: "relative"
            }}
          >
            {result.type === "art" ? (
              <div>
                <img
                  src={result.url}
                  alt={result.alt || "AI surreal art"}
                  title={result.prompt ? `Prompt: ${result.prompt}` : "AI-generated dream art"}
                  style={{
                    width: "100%",
                    borderRadius: "1em",
                    boxShadow: "0 2px 18px 0 " + COLORS.accent + "33",
                    maxHeight: 288,
                    objectFit: "cover"
                  }}
                />
                <div
                  style={{
                    color: COLORS.primary,
                    fontFamily: "'Merriweather', 'Georgia', serif",
                    marginTop: "0.8em",
                    fontSize: "1rem",
                    textAlign: "center",
                    opacity: 0.92
                  }}
                >
                  {result.description && (
                    <span>
                      <strong>Dream Visualization:</strong> {result.description}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div
                style={{
                  color: COLORS.primary,
                  lineHeight: 1.6,
                  fontSize: "1.09rem",
                  fontFamily: "'Merriweather', 'Georgia', serif",
                  whiteSpace: "pre-line"
                }}
              >
                {result.text}
              </div>
            )}

            <div style={{ marginTop: 18, display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                className="btn"
                style={{
                  borderRadius: "1.2em",
                  background: COLORS.accent,
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: "1rem"
                }}
                onClick={handleDownload}
              >
                {result.type === "art" ? "Download Art" : "Download Story"}
              </button>
              <button
                className="btn"
                style={{
                  borderRadius: "1.2em",
                  background: "#fff",
                  color: COLORS.accent,
                  border: "1.4px solid " + COLORS.accent,
                  fontWeight: 500,
                  fontSize: "1rem"
                }}
                onClick={handleShare}
              >
                Share
              </button>
            </div>
          </div>
        )}

        <div style={{
          marginTop: "0.7em",
          fontSize: "0.95em",
          opacity: 0.59,
          color: COLORS.primary
        }}>
          Powered by your imagination ✨
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
/**
 * Dreamy toggle for "Art" / "Story" mode selection.
 */
function DreamyToggle({ options, selected, onToggle, disabled }) {
  return (
    <div
      style={{
        background: "#d8eafd",
        borderRadius: "1.6em",
        padding: "2.5px 4px",
        display: "inline-flex",
        boxShadow: "0 1.5px 8px #ddf0ff88",
        gap: "7px"
      }}
      role="group"
      aria-label="Pick output mode"
    >
      {options.map(opt => (
        <button
          key={opt.key}
          aria-pressed={selected === opt.key}
          disabled={disabled}
          onClick={() => onToggle(opt.key)}
          style={{
            border: "none",
            background: selected === opt.key
              ? "linear-gradient(112deg, " + COLORS.accent + " 60%, #47aeffaa 100%)"
              : "transparent",
            color: selected === opt.key ? "#fff" : COLORS.primary,
            fontWeight: selected === opt.key ? 600 : 400,
            padding: "0.56em 1.2em",
            fontSize: "1rem",
            borderRadius: "1em",
            cursor: disabled ? "not-allowed" : "pointer",
            transition: "background 0.16s, color 0.16s"
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default DreamScapeContainer;
