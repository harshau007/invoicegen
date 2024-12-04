<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <style>[x-cloak]{display:none}</style>
    <script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.18.0/cdn/shoelace-autoloader.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.18.0/cdn/themes/light.css" />
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.3/dist/cdn.min.js"></script>
</head>
<body class="flex items-start justify-center h-full bg-gray-50">
    <sl-split-panel position-in-pixels="250" style="--min: 150px; --max: calc(100% - 150px);">
        <div
                slot="start"
                style="height: 100vh;background: var(--sl-color-neutral-50); display: flex; align-items: center; justify-content: center; overflow: hidden;"
        >
            Start
        </div>
        <div
                slot="end"
                style="height: 100vh; background: var(--sl-color-neutral-50); display: flex; align-items: center; justify-content: center; overflow: hidden;"
        >
          end
        </div>
    </sl-split-panel>
    @ 100%

    <div class="fixed inset-x-0 bottom-0 p-4">
        <div
                class="relative flex items-center justify-between gap-4 rounded-lg bg-indigo-600 px-4 py-3 text-white shadow-lg"
        >
            <p class="text-sm font-medium">
                Love Alpine JS?
                <a href="#" class="inline-block underline">Check out this new course!</a>
            </p>

            <button
                    aria-label="Close"
                    class="shrink-0 rounded-lg bg-black/10 p-1 transition hover:bg-black/20"
            >
                <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="size-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                >
                    <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                    />
                </svg>
            </button>
        </div>
    </div>

</body>
</html>