---
title: "Learning Log — October 8, 2026"
description: "Installing Debian from GRUB without a USB stick (Secure Boot shims and missing Wi-Fi firmware), AI terminals with local models, reading rejection timestamps as evidence, and checking sources at the source."
topic: "Learning Log"
order: 52
featured: true
draft: false
---

Two Linux lessons and two research lessons today. They all came down to the same move: check the layer the problem actually lives in.

## Booting a Debian installer from GRUB: the shim says no

I tried to install Debian on my laptop without a USB stick, by adding the netboot installer to GRUB and booting it from there. It failed immediately with "bad shim signature," then the `initrd` line failed too.

What's going on (a strong hypothesis that fits both errors):

```text
my GRUB entry boots through Fedora's shim
→ that shim trusts kernels signed with Fedora's key
→ Debian's installer kernel is signed with Debian's key
→ the kernel is rejected, so there's nothing for the initrd to load into
```

The simple fix is to turn Secure Boot off for the install. Debian installs its own signed shim, so Secure Boot can go back on afterward.

The bigger idea: Secure Boot is a chain of trust, and each link only vouches for what it was told to trust. Chaining from one distro's bootloader into another distro's kernel breaks the chain.

## Then the installer couldn't find any network

Once it booted, the installer couldn't see any network hardware, not even Wi-Fi. A netboot installer downloads everything, so that's a dead end.

Likely cause: the plain netboot `initrd.gz` doesn't include non-free firmware, and a lot of laptop Wi-Fi cards need firmware before they appear at all. Picking a driver from the installer's list almost never fixes this.

How to confirm it:

1. Press Ctrl+Alt+F2, then Enter, to get a shell inside the installer.
2. Run `dmesg | grep -i firmware`.
3. Lines like `Direct firmware load for ... failed` confirm it.
4. Ctrl+Alt+F5 goes back to the installer.

How to fix it, from Fedora:

```bash
sudo cp -p initrd.gz initrd.gz.orig
wget https://cdimage.debian.org/cdimage/firmware/stable/current/firmware.cpio.gz
sudo sh -c 'cat initrd.gz.orig firmware.cpio.gz > initrd.gz'
```

That works because the kernel can unpack several cpio archives glued end to end into one initramfs, so appending firmware is just appending another archive. The firmware has to match the installer's release.

I didn't record whether the install finished. The diagnosis and fix are documented on the Debian wiki, but this entry isn't proof that it worked on my machine.

## AI terminals and a safety lever

I looked at AI-centered terminals for Linux:

- **Wave** is open source and supports custom AI modes for local models in `~/.config/waveterm/waveai.json`, so pointing it at Ollama is a config change. Unless you add "tools" to a mode's capabilities, the AI can't read or write files or run commands. With a small local model I'd leave tools off, because small models can suggest a destructive command very confidently.
- **Warp** is more polished, but AI use is metered with credits. A page about bringing your own models returned a 404, so I couldn't confirm whether local models work on the free tier.
- The third option is to keep my normal terminal and run an agent CLI inside it.

Lesson about sources: if the page that would confirm a claim is gone, the claim stays unconfirmed.

## Reading rejection timestamps as evidence

I counted my job-rejection emails and built a small ledger: 9 rejections since my search started on September 17. The timing was the interesting part:

- two rejections arrived exactly 3 days and 0 seconds after I applied
- one arrived 49 seconds after I submitted

Nobody reads an application in 49 seconds. Identical timing to the second points to automated rules, not a person reviewing my work. Only one rejection gave a reason.

In my small sample, the positive signals (interviews, screens, recruiter replies, paid work) came from direct applications and outreach, while LinkedIn Easy Apply produced rejections across every track. That's a pattern in a small sample, not a law, so from here on I'm logging the application channel for every application.

Data quality turned up too: one application had a phone number that didn't match my resume. A recruiter calling the wrong number would look exactly like silence.

## Check the source, not the list

When I looked for paid developer-writing programs, several well-known ones that still appear on "write for us" lists were closed, paused, or broken when I opened their actual pages. Some others keep applications on file even when they're full. Aggregator lists age badly. The program's own page is the source.

## Researching an article about AI game mashups

I'm outlining a post on the AI-assisted game mashup trend. The viral framing is "someone fused two games together," but the real techniques are more grounded:

- bridge programs that connect two running games and pass data between them
- drop-in reuse of assets and code from existing decompilation projects
- full rewrites

The tension for the conclusion: cheap prototyping is real, and so are the legal and preservation questions. I also noted that the model most associated with the trend is the one I was researching with, which is worth disclosing.

## Still practising

- Asking which layer rejected something before trying fixes.
- Confirming firmware, signatures, and other "invisible" prerequisites first.
- Treating timestamps and channels as data.
- Going to the original page before trusting a list.

Source basis: the October 8 Linux terminal and Debian install, job-search channel, rejection ledger, writing-program, and article-research conversations.
