import React, { useState, useRef } from "react";

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

    // Deterministic art selection based on dream
    function getArtForDream(text) {
      // Lowercase and simple keyword match for demonstration
      const lc = text.toLowerCase();
      if (lc.includes("haunted house") || lc.includes("ghost") || lc.includes("spooky")) {
        return {
          url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=800&q=80", // dark haunted house
          alt: "Haunted house at night with eerie lighting"
        };
      } else if (lc.includes("forest") || lc.includes("woods") || lc.includes("trees")) {
        return {
          url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=600&q=80", // forest
          alt: "Misty surreal forest dreamscape"
        };
      } else if (lc.includes("ocean") || lc.includes("sea") || lc.includes("wave")) {
        return {
          url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=800&q=80", // ocean
          alt: "Surreal ocean waves under night sky"
        };
      } else if (lc.includes("mountain") || lc.includes("peak") || lc.includes("hill")) {
        return {
          url: "https://images.unsplash.com/photo-1465101178521-c1a9136a37bf?fit=crop&w=800&q=80", // mountain
          alt: "Dreamy mountain under a whimsical sky"
        };
      } else if (lc.includes("city") || lc.includes("urban") || lc.includes("skyscraper")) {
        return {
          url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?fit=crop&w=800&q=80", // city
          alt: "Surreal urban city at night"
        };
      } else if (lc.includes("desert") || lc.includes("sand") || lc.includes("dune")) {
        return {
          url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?fit=crop&w=800&q=80", // desert
          alt: "Dreamy desert dunes at sunset"
        };
      }
      // Fallback: Abstract dreamy
      return {
        url: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?fit=crop&w=800&q=80",
        alt: "Abstract dreamy surreal scene"
      };
    }

    // Deterministic story generation based on dream
    function getStoryForDream(text) {
      const lc = text.toLowerCase();
      if (lc.includes("haunted house") || lc.includes("ghost") || lc.includes("spooky")) {
        return (
          `Fog clung to the ground as I stepped into the haunted house. Shadows flickered along the peeling walls, and every floorboard groaned with secrets. Upstairs, a door creaked open by itself, revealing a cold room where whispers seemed to twirl in the air. I realized I was not alone—the house was alive with old dreams and restless spirits.`
        );
      } else if (lc.includes("forest") || lc.includes("woods") || lc.includes("trees")) {
        return (
          `I wandered through a twisting forest where the trees towered like silent giants. Shafts of moonlight danced on mossy roots and the air shimmered with the quiet music of hidden creatures. Each step took me deeper until the branches knitted above, painting the stars with emerald brushstrokes.`
        );
      } else if (lc.includes("ocean") || lc.includes("sea") || lc.includes("wave")) {
        return (
          `I soared above shimmering waves as translucent fish leapt through the sky. The ocean breathed beneath me, pulsing with secrets as whales sang lullabies. I walked along the water's surface, where reality melted into rippling blue infinity.`
        );
      } else if (lc.includes("mountain") || lc.includes("peak") || lc.includes("hill")) {
        return (
          `Scaling the mountain peak, I touched clouds that hummed with pastel light. The world below fell silent as golden eagles spiraled around me. At the summit, I discovered an ancient door carved into stone—beyond it, dreams waited to be explored.`
        );
      } else if (lc.includes("city") || lc.includes("urban") || lc.includes("skyscraper")) {
        return (
          `Neon rivers ran through the city of my dreams, where skyscrapers looped into impossible shapes and the streets glowed lavender. I chased reflections down winding alleys, past silent crowds whose eyes glimmered with unspoken stories.`
        );
      } else if (lc.includes("desert") || lc.includes("sand") || lc.includes("dune")) {
        return (
          `I crossed endless golden dunes, where the sun gleamed like a waking eye and the wind whispered ancient riddles. Mirage palaces flickered in the heat ahead, inviting me to lose and find myself between the shifting sands.`
        );
      }
      // Fallback: general poetic surreal
      return (
        `I drifted into a realm where colors sang and gravity lost its way. Stairs twisted into the sky, and each door I opened revealed another piece of myself made of dreamstuff.`
      );
    }

    if (mode === "art") {
      const art = getArtForDream(dream);
      setResult({
        type: "art",
        url: art.url,
        alt: art.alt,
        prompt: dream.trim()
      });
    } else {
      setResult({
        type: "story",
        text: getStoryForDream(dream)
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
