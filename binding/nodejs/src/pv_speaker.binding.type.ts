import PvSpeakerStatus from './pv_speaker_status_t.js';

/**
 * Result object from pv_speaker_init
 */
interface PvSpeakerInitResult {
    handle: bigint;
    status: PvSpeakerStatus;
}

/**
 * Result object from write/flush operations
 */
interface PvSpeakerWriteResult {
    status: PvSpeakerStatus;
    written_length: number;
}

/**
 * Configuration options for PvSpeaker
 */
interface PvSpeakerOptions {
    bufferSizeSecs?: number;
    deviceIndex?: number;
}

/**
 * Native binding interface for PvSpeaker C library
 */
export default interface PvSpeakerNativeBinding {
    /**
     * Initialize a PvSpeaker instance
     * @param sampleRate The sample rate of the audio
     * @param bitsPerSample Bits per sample (e.g., 16, 32)
     * @param bufferSizeSecs Buffer size in seconds
     * @param deviceIndex Audio device index (-1 for default)
     * @returns Object containing handle and status
     */
    init(
        sampleRate: number,
        bitsPerSample: number,
        bufferSizeSecs: number,
        deviceIndex: number
    ): PvSpeakerInitResult;

    /**
     * Delete a PvSpeaker instance and free resources
     * @param handle The instance handle
     */
    delete(handle: bigint): void;

    /**
     * Start the audio output device
     * @param handle The instance handle
     * @returns Status code
     */
    start(handle: bigint): PvSpeakerStatus;

    /**
     * Stop the audio output device
     * @param handle The instance handle
     * @returns Status code
     */
    stop(handle: bigint): PvSpeakerStatus;

    /**
     * Write PCM data to the internal circular buffer (non-blocking)
     * @param handle The instance handle
     * @param bitsPerSample Bits per sample
     * @param data PCM data as ArrayBuffer
     * @returns Result with status and written length
     */
    write(
        handle: bigint,
        bitsPerSample: number,
        data: ArrayBuffer
    ): PvSpeakerWriteResult;

    /**
     * Flush PCM data to the internal circular buffer (blocking until all data is written)
     * @param handle The instance handle
     * @param bitsPerSample Bits per sample
     * @param data PCM data as ArrayBuffer
     * @returns Result with status and written length
     */
    flush(
        handle: bigint,
        bitsPerSample: number,
        data: ArrayBuffer
    ): PvSpeakerWriteResult;

    /**
     * Check if the speaker has started
     * @param handle The instance handle
     * @returns true if started, false otherwise
     */
    get_is_started(handle: bigint): boolean;

    /**
     * Get the selected audio device name
     * @param handle The instance handle
     * @returns Device name string
     */
    get_selected_device(handle: bigint): string;

    /**
     * Get list of available audio devices
     * @returns Array of device names
     */
    get_available_devices(): string[];

    /**
     * Write PCM data to a WAV file
     * @param handle The instance handle
     * @param outputPath Path to output WAV file
     * @returns Status code
     */
    write_to_file(handle: bigint, outputPath: string): PvSpeakerStatus;

    /**
     * Get the PvSpeaker library version
     * @returns Version string
     */
    version(): string;
}
